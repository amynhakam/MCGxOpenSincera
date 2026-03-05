/**
 * MCG OpenSincera Dashboard - Main Application
 * Entry point and initialization
 */

const App = {
    /**
     * Initialize the application
     */
    async init() {
        console.log('MCG OpenSincera Dashboard initializing...');
        
        // Setup refresh button
        this.setupRefreshButton();
        
        // Load initial data
        await this.loadDashboard();
        
        // Setup auto-refresh if configured
        if (CONFIG.dashboard.autoRefreshInterval > 0) {
            setInterval(() => this.loadDashboard(), CONFIG.dashboard.autoRefreshInterval);
        }
    },
    
    /**
     * Load dashboard data
     * @param {string} startDate - Optional start date (YYYY-MM-DD)
     * @param {string} endDate - Optional end date (YYYY-MM-DD)
     */
    async loadDashboard(startDate, endDate) {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const dashboardContent = document.getElementById('dashboardContent');
        const refreshBtn = document.getElementById('refreshBtn');
        const applyBtn = document.getElementById('applyDateRange');
        
        try {
            // Show loading state
            loadingState?.classList.remove('hidden');
            errorState?.classList.add('hidden');
            dashboardContent?.classList.add('hidden');
            
            // Add spin animation to refresh button
            const refreshIcon = refreshBtn?.querySelector('svg');
            refreshIcon?.classList.add('refresh-spin');
            
            // Disable apply button during load
            if (applyBtn) applyBtn.disabled = true;
            
            // Fetch all data with optional date range
            const data = await API.getAllData(startDate, endDate);
            
            console.log('Dashboard data loaded:', data);
            
            // Hide loading, show dashboard
            loadingState?.classList.add('hidden');
            dashboardContent?.classList.remove('hidden');
            
            // Initialize dashboard with data
            Dashboard.init(data);
            
        } catch (error) {
            console.error('Failed to load dashboard:', error);
            
            // Show error state
            loadingState?.classList.add('hidden');
            errorState?.classList.remove('hidden');
            dashboardContent?.classList.add('hidden');
            
            const errorMessage = document.getElementById('errorMessage');
            if (errorMessage) {
                errorMessage.textContent = error.message || 'Unable to fetch data from the API. Please check your connection and try again.';
            }
        } finally {
            // Remove spin animation
            const refreshIcon = document.getElementById('refreshBtn')?.querySelector('svg');
            refreshIcon?.classList.remove('refresh-spin');
            
            // Re-enable apply button
            if (applyBtn) applyBtn.disabled = false;
        }
    },
    
    /**
     * Setup refresh button handler
     */
    setupRefreshButton() {
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                // Use current date range from Dashboard if available
                const { startDate, endDate } = Dashboard.dateRange || {};
                this.loadDashboard(startDate, endDate);
            });
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Also handle cases where script loads after DOM
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => App.init(), 1);
}
