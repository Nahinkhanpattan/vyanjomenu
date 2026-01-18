import { fetchWeeklyMenu, formatDate, getDayName, groupItemsByDay } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Set today's date as default
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    const form = document.getElementById('menuForm');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const errorMessage = document.getElementById('errorMessage');
    const noDataDiv = document.getElementById('noData');
    const menuContainer = document.getElementById('menuContainer');
    const menuInfoDiv = document.getElementById('menuInfo');
    const menuItemsDiv = document.getElementById('menuItems');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const diet = document.getElementById('diet').value;
        const cuisine = document.getElementById('cuisine').value;
        const tier = document.getElementById('tier').value;
        const date = document.getElementById('date').value;

        // Reset UI
        loadingDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        noDataDiv.style.display = 'none';
        menuContainer.style.display = 'none';

        try {
            const response = await fetchWeeklyMenu({ diet, cuisine, tier, date });

            if (response && response.data && response.data.menu) {
                const menu = response.data.menu;
                displayMenu(menu, menuInfoDiv, menuItemsDiv);
                menuContainer.style.display = 'block';
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            errorMessage.textContent = error.message || 'Failed to fetch menu. Please try again.';
            errorDiv.style.display = 'block';
            console.error('Error:', error);
        } finally {
            loadingDiv.style.display = 'none';
        }
    });

    function displayMenu(menu, infoDiv, itemsDiv) {
        // Display menu info
        infoDiv.innerHTML = `
            <h2>Menu Details</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Week Start</div>
                    <div class="info-value">${formatDate(menu.weekStartDate)}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Diet Type</div>
                    <div class="info-value">${menu.dietType === 'VEG' ? 'Vegetarian' : 'Non-Vegetarian'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Cuisine</div>
                    <div class="info-value">${menu.cuisineType.replace('_', ' ')}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Tier</div>
                    <div class="info-value">${menu.tier}</div>
                </div>
            </div>
        `;

        // Group items by day
        const groupedItems = groupItemsByDay(menu.items);

        // Display menu items
        itemsDiv.innerHTML = '';
        Object.keys(groupedItems)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .forEach(day => {
                const dayItems = groupedItems[day];
                const dayName = getDayName(parseInt(day));
                const dayCard = document.createElement('div');
                dayCard.className = 'menu-day';

                let dayHTML = `<div class="day-header">${dayName}</div>`;

                Object.keys(dayItems)
                    .sort((a, b) => {
                        const mealOrder = { TIFFIN: 1, BREAKFAST: 2, LUNCH: 3, DINNER: 4 };
                        return (mealOrder[a] || 5) - (mealOrder[b] || 5);
                    })
                    .forEach(mealType => {
                        const items = dayItems[mealType];
                        dayHTML += `
                            <div class="meal-section">
                                <span class="meal-type">${mealType}</span>
                                <div class="meal-items">
                                    ${items.map(item => `<div class="meal-item">${item.itemName}</div>`).join('')}
                                </div>
                            </div>
                        `;
                    });

                dayCard.innerHTML = dayHTML;
                itemsDiv.appendChild(dayCard);
            });
    }
});
