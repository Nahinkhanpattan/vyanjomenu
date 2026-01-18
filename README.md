# Weekly Menu Viewer

A vanilla JavaScript application to fetch and display weekly menus from the Vyanjo backend API.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
VITE_API_BASE_URL=https://vyanjo-backend.onrender.com
VITE_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with your real API key.

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Features

- **Diet Type Selection**: Choose between Vegetarian (VEG) and Non-Vegetarian (NON_VEG)
- **Cuisine Selection**: Select between South Indian and North Indian cuisines
- **Tier Selection**: Choose Basic, Regular, or Premium tier
- **Date Picker**: Select the date for which you want to view the menu
- **API Key Management**: Securely manage your API key through environment variables

## API Endpoint

The application fetches data from:
```
GET https://vyanjo-backend.onrender.com/api/menus/week?diet={DIET}&cuisine={CUISINE}&tier={TIER}&date={DATE}
```

## File Structure

```
src/
├── index.css        # Styling for the application
├── api.js           # API utility functions
└── main.jsx         # Application logic
index.html          # Main HTML file
.env                # Environment variables (local)
.env.example        # Example environment variables
```

## Response Format

The API returns menu data with the following structure:
```json
{
  "data": {
    "menu": {
      "id": "...",
      "dietType": "VEG",
      "cuisineType": "SOUTH_INDIAN",
      "weekStartDate": "2026-01-19T00:00:00.000Z",
      "tier": "REGULAR",
      "items": [
        {
          "id": "...",
          "itemName": "Plain Dosa",
          "dayOfWeek": 1,
          "mealType": "TIFFIN"
        }
      ]
    }
  }
}
```

## Notes

- The API key is loaded from environment variables and not stored in the HTML
- The default date is set to today's date
- Menu items are grouped by day of week and meal type
