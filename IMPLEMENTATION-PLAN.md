# Implementation Plan
## MCG OpenSincera Dashboard

**Version:** 1.0  
**Date:** March 4, 2026  
**Status:** Ready for Implementation

---

## 1. Overview

This document outlines the implementation plan for building the MCG OpenSincera Dashboard based on the approved Product Requirements Document.

### Project Summary
| Attribute | Value |
|-----------|-------|
| Project Name | MCG OpenSincera Dashboard |
| Type | Single-page web application |
| Tech Stack | HTML, Tailwind CSS, Vanilla JS, Chart.js |
| Estimated Effort | 3-4 days |
| Dependencies | OpenSincera API access, valid API token |

---

## 2. Implementation Phases

### Phase 1: Project Setup & Foundation
**Duration:** 0.5 days

| Task | Description | Status |
|------|-------------|--------|
| 1.1 | Create project folder structure | ✅ Complete |
| 1.2 | Set up `index.html` with CDN dependencies | ✅ Complete |
| 1.3 | Create `config.js` with API settings | ✅ Complete |
| 1.4 | Create base CSS styles | ✅ Complete |
| 1.5 | Set up Tailwind configuration | ✅ Complete |

### Phase 2: API Integration Layer
**Duration:** 0.5 days

| Task | Description | Status |
|------|-------------|--------|
| 2.1 | Create `api.js` module | ✅ Complete |
| 2.2 | Implement authenticated fetch wrapper | ✅ Complete |
| 2.3 | Add endpoint methods (ecosystem, publishers, adsystems, modules) | ✅ Complete |
| 2.4 | Implement `getAllData()` for parallel fetching | ✅ Complete |
| 2.5 | Add error handling for API failures | ✅ Complete |

### Phase 3: Core Dashboard UI
**Duration:** 1 day

| Task | Description | Status |
|------|-------------|--------|
| 3.1 | Create header component (logo, title, refresh button) | ✅ Complete |
| 3.2 | Create loading state UI | ✅ Complete |
| 3.3 | Create error state UI with retry | ✅ Complete |
| 3.4 | Create publisher banner section | ✅ Complete |
| 3.5 | Create metrics cards grid (8 cards) | ✅ Complete |
| 3.6 | Create ecosystem stats section | ✅ Complete |
| 3.7 | Implement responsive layouts | ✅ Complete |

### Phase 4: Data Tables
**Duration:** 0.5 days

| Task | Description | Status |
|------|-------------|--------|
| 4.1 | Create Ad Systems table structure | ✅ Complete |
| 4.2 | Implement search functionality | ✅ Complete |
| 4.3 | Implement pagination | ✅ Complete |
| 4.4 | Create Prebid Modules table structure | ✅ Complete |
| 4.5 | Implement category filtering | ✅ Complete |
| 4.6 | Implement column sorting | ✅ Complete |
| 4.7 | Add detection count visual bar | ✅ Complete |

### Phase 5: Data Visualization
**Duration:** 0.5 days

| Task | Description | Status |
|------|-------------|--------|
| 5.1 | Create `charts.js` module | ✅ Complete |
| 5.2 | Implement Device Metrics bar chart | ✅ Complete |
| 5.3 | Implement Industry Comparison radar chart | ✅ Complete |
| 5.4 | Implement Prebid Versions doughnut chart | ✅ Complete |
| 5.5 | Implement Media Types horizontal bar chart | ✅ Complete |
| 5.6 | Configure chart styling (dark theme) | ✅ Complete |

### Phase 6: Export Functionality
**Duration:** 0.5 days

| Task | Description | Status |
|------|-------------|--------|
| 6.1 | Create `export.js` module | ✅ Complete |
| 6.2 | Implement Excel export with SheetJS | ✅ Complete |
| 6.3 | Add Publisher Metrics export | ✅ Complete |
| 6.4 | Add Ad Systems export | ✅ Complete |
| 6.5 | Add Prebid Modules export | ✅ Complete |
| 6.6 | Add Full Report export (multi-sheet) | ✅ Complete |
| 6.7 | Add export success/error notifications | ✅ Complete |

### Phase 7: Integration & Polish
**Duration:** 0.5 days

| Task | Description | Status |
|------|-------------|--------|
| 7.1 | Create `app.js` entry point | ✅ Complete |
| 7.2 | Wire up all event listeners | ✅ Complete |
| 7.3 | Connect refresh button | ✅ Complete |
| 7.4 | Add loading animations | ✅ Complete |
| 7.5 | Add hover effects and transitions | ✅ Complete |
| 7.6 | Test responsive breakpoints | ⬜ Pending |

### Phase 8: Testing & Validation
**Duration:** 0.5 days

| Task | Description | Status |
|------|-------------|--------|
| 8.1 | Test API integration with live data | ⬜ Pending |
| 8.2 | Validate all metrics display correctly | ⬜ Pending |
| 8.3 | Test export functionality | ⬜ Pending |
| 8.4 | Test search/filter/sort features | ⬜ Pending |
| 8.5 | Test responsive design on mobile | ⬜ Pending |
| 8.6 | Cross-browser testing | ⬜ Pending |
| 8.7 | Performance testing | ⬜ Pending |

### Phase 9: Documentation
**Duration:** 0.25 days

| Task | Description | Status |
|------|-------------|--------|
| 9.1 | Create README.md | ✅ Complete |
| 9.2 | Create PRODUCT-REQUIREMENTS.md | ✅ Complete |
| 9.3 | Create IMPLEMENTATION-PLAN.md | ✅ Complete |
| 9.4 | Add inline code comments | ✅ Complete |

---

## 3. File Implementation Details

### 3.1 index.html
```
Purpose: Main HTML structure and CDN imports
Dependencies: Tailwind CSS, Chart.js, SheetJS
Key Sections:
  - Header with branding and controls
  - Loading/Error states
  - Publisher banner
  - Metrics grid
  - Chart containers
  - Data tables
  - Footer
```

### 3.2 css/styles.css
```
Purpose: Custom styles extending Tailwind
Key Features:
  - Dark theme color scheme
  - Card hover effects
  - Skeleton loading animations
  - Custom scrollbar styling
  - Module category badges
  - Detection count bars
  - Print styles
```

### 3.3 js/config.js
```
Purpose: Centralized configuration
Contents:
  - API base URL and token
  - Publisher ID (34732)
  - Endpoint definitions
  - Pagination settings
  - Color palette
  - Metric definitions with formats
  - Industry benchmark values
```

### 3.4 js/api.js
```
Purpose: API communication layer
Methods:
  - request(endpoint, params) - Authenticated fetch
  - getEcosystem() - Fetch ecosystem data
  - getPublisher(id) - Fetch publisher data
  - getAdSystems() - Fetch all ad systems
  - getPrebidModules() - Fetch Prebid modules
  - getAllData() - Parallel fetch all endpoints
```

### 3.5 js/charts.js
```
Purpose: Chart.js configuration and rendering
Charts:
  - renderDeviceMetricsChart() - Bar chart
  - renderIndustryComparisonChart() - Radar chart
  - renderPrebidVersionsChart() - Doughnut chart
  - renderMediaTypesChart() - Horizontal bar chart
Utilities:
  - formatDeviceName()
  - formatMediaType()
  - formatLargeNumber()
  - destroyAll()
```

### 3.6 js/dashboard.js
```
Purpose: UI rendering and state management
State:
  - data - Current dashboard data
  - pagination - Table pagination state
Methods:
  - init(data) - Initialize dashboard
  - render() - Render all components
  - renderPublisherBanner()
  - renderMetricsCards()
  - renderEcosystemStats()
  - renderAdSystemsTable()
  - renderPrebidModulesTable()
  - renderCharts()
  - setupEventListeners()
Utilities:
  - formatMetricValue()
  - formatNumber()
  - calculateTrend()
  - getIcon()
```

### 3.7 js/export.js
```
Purpose: Excel/CSV export functionality
Methods:
  - toExcel(data, filename, sheetName)
  - toCSV(data, filename)
  - exportPublisherMetrics(publisherData)
  - exportAdSystems(adSystems)
  - exportPrebidModules(modules)
  - exportAll(dashboardData)
Utilities:
  - flattenPublisherData()
  - flattenEcosystemData()
  - getTimestamp()
  - showNotification()
```

### 3.8 js/app.js
```
Purpose: Application entry point
Methods:
  - init() - Bootstrap application
  - loadDashboard() - Fetch and render data
  - setupRefreshButton()
Lifecycle:
  - DOMContentLoaded → init() → loadDashboard()
```

---

## 4. API Data Mapping

### 4.1 Publisher Endpoint → UI Mapping

| API Field | UI Element | Format |
|-----------|------------|--------|
| `name` | Publisher Banner Title | Text |
| `domain` | Publisher Banner Subtitle | Text |
| `pub_description` | Publisher Description | Text (truncated) |
| `categories` | Category Badges | Badge array |
| `status` | (Internal use) | String |
| `avg_ads_in_view` | Metric Card | Decimal (2) |
| `avg_ad_refresh` | Metric Card | Seconds |
| `avg_page_weight` | Metric Card | MB |
| `avg_cpu` | Metric Card | Seconds |
| `total_unique_gpids` | Metric Card | Number |
| `id_absorption_rate` | Metric Card | Percentage |
| `total_supply_paths` | Metric Card | Number |
| `reseller_count` | Metric Card | Number |
| `device_level_metrics` | Device Chart | Object → Chart |
| `updated_at` | Header Timestamp | DateTime |

### 4.2 Ecosystem Endpoint → UI Mapping

| API Field | UI Element | Format |
|-----------|------------|--------|
| `date` | Ecosystem Date Label | Date |
| `known_adsystems` | Ecosystem Stat | Number |
| `global_gpids` | Ecosystem Stat | Number (K/M/B) |
| `sincera_ecosystem_size` | Ecosystem Stat | Number |
| `pubs_with_gpid` | Ecosystem Stat | Number |
| `video_plcmt_pubs` | Ecosystem Stat | Number |
| `avg_user_modules_deployed` | Ecosystem Stat | Number |
| `pbjs_major_versions` | Prebid Versions Chart | Object → Chart |
| `pbjs_ad_unit_media_types` | Media Types Chart | Object → Chart |

### 4.3 Ad Systems Endpoint → UI Mapping

| API Field | Table Column |
|-----------|--------------|
| `image.url` | Logo |
| `name` | Name |
| `canonical_domain` | Domain |
| `description` | Description |

### 4.4 Prebid Modules Endpoint → UI Mapping

| API Field | Table Column |
|-----------|--------------|
| `module_name` | Module Name |
| `module_category` | Category (with badge styling) |
| `detected_count` | Detection Count (with visual bar) |
| `adsystem_id` | Ad System ID |

---

## 5. Event Handlers

| Event | Element | Handler |
|-------|---------|---------|
| Click | Refresh Button | `App.loadDashboard()` |
| Input | Ad Systems Search | Filter & re-render table |
| Change | Prebid Category Filter | Filter & re-render table |
| Click | Ad Systems Prev/Next | Paginate table |
| Click | Prebid Prev/Next | Paginate table |
| Click | Table Header (sortable) | Sort & re-render table |
| Click | Export Metrics | `Export.exportPublisherMetrics()` |
| Click | Export Ad Systems | `Export.exportAdSystems()` |
| Click | Export Prebid | `Export.exportPrebidModules()` |

---

## 6. Error Handling

| Scenario | Handling |
|----------|----------|
| API request fails | Show error state with message, retry button |
| Invalid API token | Display authentication error |
| Network timeout | Show timeout message, allow retry |
| Empty data response | Show "No data available" message |
| Chart rendering error | Log to console, skip chart |
| Export error | Show toast notification |

---

## 7. Testing Checklist

### Functional Testing
- [ ] Dashboard loads with valid API token
- [ ] All 8 metric cards display correct values
- [ ] Publisher banner shows name, domain, description, categories
- [ ] Ecosystem stats display correctly
- [ ] Device Metrics chart renders
- [ ] Industry Comparison chart renders
- [ ] Prebid Versions chart renders
- [ ] Media Types chart renders
- [ ] Ad Systems table displays data
- [ ] Ad Systems search filters correctly
- [ ] Ad Systems pagination works
- [ ] Prebid Modules table displays data
- [ ] Prebid category filter works
- [ ] Prebid column sorting works
- [ ] Prebid pagination works
- [ ] Export Metrics generates valid Excel
- [ ] Export Ad Systems generates valid Excel
- [ ] Export Prebid Modules generates valid Excel
- [ ] Refresh button reloads data
- [ ] Last updated timestamp updates

### Error Handling Testing
- [ ] Invalid API token shows error state
- [ ] Network failure shows error state
- [ ] Retry button works after error
- [ ] Empty data handled gracefully

### Responsive Testing
- [ ] Desktop (1200px+) - Full layout
- [ ] Tablet (768px-1199px) - Adjusted grid
- [ ] Mobile (<768px) - Stacked layout
- [ ] Charts resize correctly
- [ ] Tables scroll horizontally on mobile

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 8. Deployment

### Local Development
```bash
# Option 1: Python server
cd MCGOpenSinceraDashboard
python -m http.server 8080

# Option 2: Node.js serve
npx serve .

# Option 3: VS Code Live Server
# Right-click index.html → Open with Live Server
```

### Production Deployment
1. Update API token in `config.js` (or use environment variable)
2. Upload files to web server / CDN
3. Configure CORS if needed
4. Test with production API

---

## 9. Known Limitations

| Limitation | Workaround | Future Fix |
|------------|------------|------------|
| No CORS proxy | Use local server | Add proxy in v2 |
| Token in client code | Internal use only | Add auth in v2 |
| No data caching | Manual refresh | Add caching in v2 |
| Single publisher only | Hardcoded ID | Multi-publisher in v2 |
| No historical data | Current data only | Time series in v2 |

---

## 10. Current Implementation Status

| Phase | Status | Completion |
|-------|--------|------------|
| Phase 1: Setup | ✅ Complete | 100% |
| Phase 2: API Layer | ✅ Complete | 100% |
| Phase 3: Core UI | ✅ Complete | 100% |
| Phase 4: Tables | ✅ Complete | 100% |
| Phase 5: Charts | ✅ Complete | 100% |
| Phase 6: Export | ✅ Complete | 100% |
| Phase 7: Integration | ✅ Complete | 95% |
| Phase 8: Testing | ⬜ Pending | 0% |
| Phase 9: Documentation | ✅ Complete | 100% |

**Overall Progress: ~90% Complete**

**Next Steps:**
1. Test with live API data
2. Validate all metrics display correctly
3. Test export functionality
4. Cross-browser testing
5. Deploy to staging environment

---

## 11. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 4, 2026 | MCG Team | Initial implementation plan |
