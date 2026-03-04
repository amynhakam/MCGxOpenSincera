# Product Requirements Document
## MCG OpenSincera Dashboard

**Version:** 1.0  
**Date:** March 4, 2026  
**Author:** MCG Ad Tech Team  
**Status:** Draft - Pending Review

---

## 1. Executive Summary

The MCG OpenSincera Dashboard is an internal ad tech analytics tool for Microsoft Casual Games that provides real-time visibility into publisher performance metrics, industry benchmarks, ad system data, and Prebid module detection through the OpenSincera API.

---

## 2. Problem Statement

The MCG ad tech team needs a centralized, easy-to-use dashboard to:
- Monitor publisher ad performance metrics
- Compare performance against industry benchmarks
- Track ad system ecosystem data
- Analyze Prebid module adoption and detection rates
- Export data for reporting and analysis

---

## 3. Goals & Success Metrics

### Primary Goals
| Goal | Measure of Success |
|------|-------------------|
| Centralized visibility | Single dashboard for all OpenSincera metrics |
| Quick insights | Dashboard loads and displays data in < 5 seconds |
| Data accessibility | Export functionality for all major data sets |
| Mobile-friendly | Responsive design works on all screen sizes |

### Non-Goals (Out of Scope for v1.0)
- Historical data trending/time series
- Multi-publisher comparison (limited to publisher ID 34732)
- User authentication/login system
- Data caching/offline mode
- Alerting or notifications

---

## 4. Target Users

| User Type | Use Case |
|-----------|----------|
| Ad Ops Team | Monitor daily ad performance, identify issues |
| Product Managers | Review metrics for reporting, track KPIs |
| Engineering | Debug ad implementation, verify integrations |
| Leadership | High-level overview of ad health |

---

## 5. Data Sources & API Integration

### OpenSincera API
- **Base URL:** `https://open.sincera.io/api`
- **Authentication:** Bearer Token
- **Publisher ID:** 34732 (Microsoft Casual Games)

### Endpoints Used

| Endpoint | Purpose | Refresh Frequency |
|----------|---------|-------------------|
| `/ecosystem` | Industry-wide ecosystem statistics | On-demand |
| `/publishers?id=34732` | MCG-specific publisher metrics | On-demand |
| `/adsystems` | List of all ad systems in ecosystem | On-demand |
| `/mapping_modules` | Prebid module detection data | On-demand |

---

## 6. Functional Requirements

### 6.1 Publisher Metrics Display

**Priority: P0 (Must Have)**

Display the following metrics for publisher ID 34732:

| Metric | API Field | Display Format |
|--------|-----------|----------------|
| Average Ads in View | `avg_ads_in_view` | Decimal (2 places) |
| Average Ad Refresh | `avg_ad_refresh` | Seconds |
| Average Page Weight | `avg_page_weight` | MB |
| Average CPU Usage | `avg_cpu` | Seconds |
| Total Unique GPIDs | `total_unique_gpids` | Number |
| ID Absorption Rate | `id_absorption_rate` | Percentage |
| Total Supply Paths | `total_supply_paths` | Number |
| Reseller Count | `reseller_count` | Number |
| Device-Level Metrics | `device_level_metrics` | Grouped by device |
| IAB Categories | `categories` | Badge list |

### 6.2 Industry Benchmarks Comparison

**Priority: P0 (Must Have)**

- Compare publisher metrics against industry averages
- Visual indicator showing above/below benchmark
- Radar chart for multi-metric comparison

### 6.3 Ecosystem Overview

**Priority: P1 (Should Have)**

Display ecosystem-wide statistics:
- Known Ad Systems count
- Global GPIDs count
- Ecosystem Size (publisher count)
- Publishers with GPID
- Video Placement Publishers
- Average User Modules Deployed

### 6.4 Ad Systems Table

**Priority: P1 (Should Have)**

- Display all ad systems from `/adsystems` endpoint
- Show: Logo, Name, Domain, Description
- Search/filter functionality
- Pagination (10 per page)
- Export to Excel

### 6.5 Prebid Module Detection

**Priority: P1 (Should Have)**

- Display Prebid modules from `/mapping_modules` endpoint
- Show: Module Name, Category, Detection Count, Ad System ID
- Filter by category (Bid, Analytics, ID, RTD, Formats)
- Sort by any column
- Visual detection count bar
- Pagination (15 per page)
- Export to Excel

### 6.6 Data Visualization

**Priority: P1 (Should Have)**

| Chart | Type | Data Source |
|-------|------|-------------|
| Device Metrics | Bar Chart | `device_level_metrics` |
| Industry Comparison | Radar Chart | Publisher vs Benchmarks |
| Prebid Versions | Doughnut Chart | `pbjs_major_versions` |
| Ad Media Types | Horizontal Bar | `pbjs_ad_unit_media_types` |

### 6.7 Export Functionality

**Priority: P0 (Must Have)**

- Export Publisher Metrics to Excel (.xlsx)
- Export Ad Systems to Excel
- Export Prebid Modules to Excel
- Export Full Report (all data in one workbook)

### 6.8 Refresh Capability

**Priority: P0 (Must Have)**

- Manual refresh button in header
- Display last updated timestamp
- Loading state during data fetch
- Error state with retry option

---

## 7. Non-Functional Requirements

### 7.1 Performance
- Initial page load: < 3 seconds
- API data fetch: < 5 seconds
- Chart rendering: < 1 second
- Export generation: < 3 seconds

### 7.2 Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Android)

### 7.3 Responsiveness
- Desktop: 1200px+ (full layout)
- Tablet: 768px-1199px (adjusted grid)
- Mobile: < 768px (stacked layout)

### 7.4 Security
- API token stored in config file (not exposed to users)
- No user data collection
- HTTPS only for API calls

---

## 8. Technical Architecture

### 8.1 Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Markup | HTML5 | Standard, no build required |
| Styling | Tailwind CSS (CDN) | Rapid development, responsive |
| Logic | Vanilla JavaScript | Lightweight, no dependencies |
| Charts | Chart.js | Easy to use, responsive |
| Export | SheetJS (xlsx) | Robust Excel generation |

### 8.2 File Structure

```
MCGOpenSinceraDashboard/
├── index.html              # Main entry point
├── css/
│   └── styles.css          # Custom styles
└── js/
    ├── config.js           # API config & settings
    ├── api.js              # API communication
    ├── charts.js           # Chart configurations
    ├── dashboard.js        # UI rendering & state
    ├── export.js           # Export functionality
    └── app.js              # Application bootstrap
```

### 8.3 Data Flow

```
User Action → App.js → API.js → OpenSincera API
                ↓
         Dashboard.js → Render UI
                ↓
         Charts.js → Render Charts
                ↓
         Export.js → Generate Excel (on demand)
```

---

## 9. User Interface Design

### 9.1 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| MCG Blue | `#0078D4` | Primary accent, buttons |
| Dark Background | `#1a1a2e` | Page background |
| Card Background | `#16213e` | Card surfaces |
| Accent | `#0f3460` | Borders, secondary elements |
| Success | `#10b981` | Positive trends |
| Warning | `#f59e0b` | Neutral/benchmark |
| Danger | `#ef4444` | Negative trends |

### 9.2 Layout Sections

1. **Header** - Logo, title, last updated, refresh button
2. **Publisher Banner** - Name, domain, description, categories
3. **Metrics Grid** - 8 key metric cards (4 columns)
4. **Charts Row** - Device metrics + Industry comparison (2 columns)
5. **Ecosystem Overview** - 6 stat cards (6 columns)
6. **Charts Row** - Prebid versions + Media types (2 columns)
7. **Ad Systems Table** - Searchable, paginated
8. **Prebid Modules Table** - Filterable, sortable, paginated
9. **Footer** - Copyright, API attribution

---

## 10. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | Should we add historical data trending in v2? | Product | Open |
| 2 | Do we need to support multiple publisher IDs? | Product | Open |
| 3 | Should auto-refresh be enabled? If so, interval? | Product | Open |
| 4 | Are the industry benchmark values accurate? | Ad Ops | Open |
| 5 | Should we add user authentication in future? | Engineering | Open |
| 6 | Do we need CORS proxy for API calls? | Engineering | Open |

---

## 11. Future Enhancements (v2.0+)

- [ ] Historical data trending with date range selector
- [ ] Multi-publisher comparison view
- [ ] Custom metric thresholds and alerts
- [ ] Scheduled report generation
- [ ] Integration with internal dashboards
- [ ] User preferences/settings persistence
- [ ] Dark/light theme toggle
- [ ] PDF export option

---

## 12. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 4, 2026 | MCG Team | Initial draft |

---

## 13. Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | | | |
| Engineering Lead | | | |
| Ad Ops Lead | | | |

---

**Please review this document and provide feedback on:**
1. Are the metrics and data sources correct?
2. Are priority levels (P0/P1) appropriate?
3. Any missing requirements?
4. Any changes to the UI layout or design?
5. Answers to open questions
