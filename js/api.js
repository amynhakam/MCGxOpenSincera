/**
 * MCG OpenSincera Dashboard - API Module
 * Handles all API communications with OpenSincera
 */

const API = {
    /**
     * Make an authenticated API request
     * @param {string} endpoint - API endpoint
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} - API response data
     */
    async request(endpoint, params = {}) {
        // Build URL string directly (works with relative paths)
        let url = `${CONFIG.api.baseUrl}${endpoint}`;
        
        // Add query parameters
        const queryParams = Object.keys(params)
            .filter(key => params[key] !== undefined && params[key] !== null)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
        
        if (queryParams) {
            url += `?${queryParams}`;
        }
        
        console.log('API Request:', url);
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
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
     * @returns {Promise<Object>} - Ecosystem data
     */
    async getEcosystem() {
        return this.request(CONFIG.api.endpoints.ecosystem);
    },
    
    /**
     * Get publisher data by ID
     * @param {number} publisherId - Publisher ID
     * @returns {Promise<Object>} - Publisher data
     */
    async getPublisher(publisherId = CONFIG.api.publisherId) {
        return this.request(CONFIG.api.endpoints.publishers, { id: publisherId });
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
     * @returns {Promise<Object>} - All dashboard data
     */
    async getAllData() {
        try {
            const [ecosystem, publisher, adSystems, prebidModules] = await Promise.all([
                this.getEcosystem(),
                this.getPublisher(),
                this.getAdSystems(),
                this.getPrebidModules()
            ]);
            
            return {
                ecosystem,
                publisher,
                adSystems,
                prebidModules,
                fetchedAt: new Date().toISOString()
            };
        } catch (error) {
            console.error('Failed to fetch all dashboard data:', error);
            throw error;
        }
    }
};

// Freeze API object
Object.freeze(API);
