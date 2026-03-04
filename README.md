# MCG OpenSincera Dashboard

A responsive, lightweight ad tech analytics dashboard for Microsoft Casual Games, powered by the OpenSincera API.

![Dashboard Preview](https://via.placeholder.com/800x400?text=MCG+OpenSincera+Dashboard)

## Features

### 📊 Publisher Metrics
- Average Ads in View
- Ad Refresh Rate (seconds)
- Page Weight (MB)
- CPU Usage
- Total GPIDs
- ID Absorption Rate
- Supply Paths
- Reseller Count
- Device-level Metrics
- IAB Categories

### 🌐 Ecosystem Overview
- Known Ad Systems count
- Global GPIDs
- Ecosystem Size
- Publishers with GPID
- Video Placement Publishers
- Average User Modules Deployed

### 📈 Visual Analytics
- **Device Metrics Chart** - A2CR and Ads in View by device type
- **Industry Comparison Radar** - Compare your metrics against industry benchmarks
- **Prebid Versions Doughnut** - Distribution of Prebid major versions
- **Ad Media Types Bar** - Banner, Video, Native ad unit breakdown

### 🔧 Ad Systems & Prebid Modules
- Searchable Ad Systems table with logos
- Filterable Prebid Modules by category (Bid, Analytics, ID, RTD, Formats)
- Sortable columns
- Detection count visualizations

### 📤 Export Capabilities
- Export Publisher Metrics to Excel
- Export Ad Systems list
- Export Prebid Modules data
- Export complete dashboard report

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Vanilla HTML/CSS/JS |
| Styling | Tailwind CSS (CDN) |
| Charts | Chart.js |
| Export | SheetJS (xlsx) |
| Icons | Heroicons (inline SVG) |

## Getting Started

### Prerequisites
- A modern web browser
- OpenSincera API token
- Web server (optional, for local development)

### Configuration

1. Open `js/config.js`
2. Update the API configuration:

```javascript
const CONFIG = {
    api: {
        baseUrl: 'https://open.sincera.io/api',
        token: 'YOUR_API_TOKEN_HERE',  // Replace with your token
        publisherId: 34732,             // Your publisher ID
        // ...
    }
};
```

### Running Locally

#### Option 1: Direct file open
Simply open `index.html` in your browser. Note: Some browsers may block API requests due to CORS when opening files directly.

#### Option 2: Local server (recommended)

Using Python:
```bash
cd MCGOpenSinceraDashboard
python -m http.server 8080
```

Using Node.js:
```bash
npx serve .
```

Using VS Code Live Server extension:
- Right-click `index.html` → "Open with Live Server"

Then open `http://localhost:8080` in your browser.

## Project Structure

```
MCGOpenSinceraDashboard/
├── index.html          # Main HTML file
├── README.md           # This file
├── css/
│   └── styles.css      # Custom styles (extends Tailwind)
└── js/
    ├── config.js       # Configuration & API settings
    ├── api.js          # API communication module
    ├── charts.js       # Chart.js configurations
    ├── dashboard.js    # Dashboard UI & state management
    ├── export.js       # Excel/CSV export functionality
    └── app.js          # Application entry point
```

## API Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `/ecosystem` | Overall ecosystem statistics |
| `/publishers?id=34732` | Publisher-specific metrics |
| `/adsystems` | List of all ad systems |
| `/mapping_modules` | Prebid module detection data |

## Customization

### Changing Colors
Edit the Tailwind config in `index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'mcg-blue': '#0078D4',    // Primary blue
                'mcg-dark': '#1a1a2e',    // Background
                // ...
            }
        }
    }
}
```

### Adding New Metrics
1. Add metric definition in `js/config.js` under `metrics` object
2. Update `renderMetricsCards()` in `js/dashboard.js`

### Modifying Charts
Edit `js/charts.js` to customize chart types, colors, or add new charts.

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Troubleshooting

### CORS Errors
If you see CORS errors in the console:
1. Use a local web server instead of opening the file directly
2. Check that your API token is valid
3. Verify the API base URL is correct

### Charts Not Rendering
- Ensure Chart.js CDN is loading correctly
- Check browser console for JavaScript errors
- Verify data is being returned from the API

### Export Not Working
- Ensure SheetJS library is loaded
- Check that the browser allows file downloads
- Verify there is data to export

## License

MIT License - Microsoft Casual Games

## Acknowledgments

- [OpenSincera](https://open.sincera.io/) for providing the ad tech analytics API
- [Chart.js](https://www.chartjs.org/) for beautiful charts
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [SheetJS](https://sheetjs.com/) for Excel export functionality
