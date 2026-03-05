/**
 * MCG OpenSincera Dashboard - API Module
 * Handles all API communications with OpenSincera
 */

const API = {
    // CORS proxy to bypass browser restrictions (free service)
    corsProxy: 'https://corsproxy.io/?',
    
    /**
     * Make an authenticated API request
     * @param {string} endpoint - API endpoint
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} - API response data
     */
    async request(endpoint, params = {}) {
        // Build URL string directly (works with relative paths)
        let apiUrl = `${CONFIG.api.baseUrl}${endpoint}`;
        
        // Add query parameters
        const queryParams = Object.keys(params)
            .filter(key => params[key] !== undefined && params[key] !== null)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
        
        if (queryParams) {
            apiUrl += `?${queryParams}`;
        }
        
        // Use CORS proxy to wrap the request
        const url = this.corsProxy + encodeURIComponent(apiUrl);
        
        console.log('API Request:', apiUrl);
        
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            
            // Add auth token if configured
            if (CONFIG.api.token) {
                headers['Authorization'] = `Bearer ${CONFIG.api.token}`;
            }
            
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`API request failed for ${endpoint}:`, error);
            throw error;
        }
    },
    
    /**
     * Get ecosystem data
     * @param {string} startDate - Optional start date (YYYY-MM-DD)
     * @param {string} endDate - Optional end date (YYYY-MM-DD)
     * @returns {Promise<Object>} - Ecosystem data
     */
    async getEcosystem(startDate, endDate) {
        const params = {};
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;
        return this.request(CONFIG.api.endpoints.ecosystem, params);
    },
    
    /**
     * Get publisher data by ID
     * @param {number} publisherId - Publisher ID
     * @param {string} startDate - Optional start date (YYYY-MM-DD)
     * @param {string} endDate - Optional end date (YYYY-MM-DD)
     * @returns {Promise<Object>} - Publisher data
     */
    async getPublisher(publisherId = CONFIG.api.publisherId, startDate, endDate) {
        const params = { id: publisherId };
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;
        return this.request(CONFIG.api.endpoints.publishers, params);
    },
    
    /**
     * Get all ad systems
     * @returns {Promise<Array>} - Array of ad systems
     */
    async getAdSystems() {
        return this.request(CONFIG.api.endpoints.adsystems);
    },
    
    /**
     * Get Prebid module mappings
     * @returns {Promise<Array>} - Array of Prebid modules
     */
    async getPrebidModules() {
        return this.request(CONFIG.api.endpoints.mappingModules);
    },
    
    /**
     * Fetch all dashboard data in parallel
     * @param {string} startDate - Optional start date (YYYY-MM-DD)
     * @param {string} endDate - Optional end date (YYYY-MM-DD)
     * @returns {Promise<Object>} - All dashboard data
     */
    async getAllData(startDate, endDate) {
        try {
            const [ecosystem, publisher, adSystems, prebidModules] = await Promise.all([
                this.getEcosystem(startDate, endDate),
                this.getPublisher(CONFIG.api.publisherId, startDate, endDate),
                this.getAdSystems(),
                this.getPrebidModules()
            ]);
            
            return {
                ecosystem,
                publisher,
                adSystems,
                prebidModules,
                fetchedAt: new Date().toISOString(),
                dateRange: { startDate, endDate }
            };
        } catch (error) {
            console.error('Failed to fetch all dashboard data:', error);
            throw error;
        }
    }
};

// Freeze API object
Object.freeze(API);
