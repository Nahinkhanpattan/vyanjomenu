const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vyanjo-backend.onrender.com';
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchWeeklyMenu(params) {
    const { diet, cuisine, tier, date } = params;

    const queryParams = new URLSearchParams({
        diet: diet,
        cuisine: cuisine,
        tier: tier,
        date: date
    });

    const url = `${API_BASE_URL}/api/menus/week?${queryParams.toString()}`;

    const headers = {
        'Content-Type': 'application/json'
    };

    if (API_KEY) {
        headers['Authorization'] = `Bearer ${API_KEY}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: headers
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch menu: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function getDayName(dayOfWeek) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek % 7];
}

export function groupItemsByDay(items) {
    const grouped = {};
    items.forEach(item => {
        const day = item.dayOfWeek;
        if (!grouped[day]) {
            grouped[day] = {};
        }
        const mealType = item.mealType;
        if (!grouped[day][mealType]) {
            grouped[day][mealType] = [];
        }
        grouped[day][mealType].push(item);
    });
    return grouped;
}
