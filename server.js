/**
 * MCG OpenSincera Dashboard - Proxy Server
 * Handles CORS by proxying requests to the OpenSincera API
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// OpenSincera API configuration
const SINCERA_API_BASE = 'https://open.sincera.io/api';
const SINCERA_TOKEN = 'c54dc3e17898500ecab43e76ba24bf';

// Enable CORS for all origins
app.use(cors());

// Parse JSON
app.use(express.json());

// Serve static files from current directory
app.use(express.static(__dirname));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Proxy endpoint for ecosystem
app.get('/api/ecosystem', async (req, res) => {
    await proxyRequest('ecosystem', req, res);
});

// Proxy endpoint for publishers
app.get('/api/publishers', async (req, res) => {
    const queryString = req.query.id ? `?id=${req.query.id}` : '';
    await proxyRequest(`publishers${queryString}`, req, res);
});

// Proxy endpoint for adsystems
app.get('/api/adsystems', async (req, res) => {
    await proxyRequest('adsystems', req, res);
});

// Proxy endpoint for mapping_modules
app.get('/api/mapping_modules', async (req, res) => {
    await proxyRequest('mapping_modules', req, res);
});

// Generic proxy function
async function proxyRequest(endpoint, req, res) {
    const url = `${SINCERA_API_BASE}/${endpoint}`;
    console.log(`[${new Date().toISOString()}] Proxying: ${url}`);
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${SINCERA_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log(`[${new Date().toISOString()}] Response status: ${response.status}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error: ${response.status} - ${errorText}`);
            return res.status(response.status).json({
                error: `API Error: ${response.status}`,
                details: errorText
            });
        }
        
        const data = await response.json();
        res.json(data);
        
    } catch (error) {
        console.error(`Proxy error: ${error.message}`);
        res.status(500).json({
            error: 'Failed to fetch from OpenSincera API',
            message: error.message
        });
    }
}

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
const server = app.listen(PORT, '127.0.0.1', () => {
    console.log('');
    console.log('='.repeat(55));
    console.log('  MCG OpenSincera Dashboard Server');
    console.log('='.repeat(55));
    console.log(`  Dashboard:  http://localhost:${PORT}`);
    console.log(`  API Proxy:  http://localhost:${PORT}/api/proxy/`);
    console.log(`  Health:     http://localhost:${PORT}/api/health`);
    console.log('='.repeat(55));
    console.log('  Press Ctrl+C to stop');
    console.log('');
});

// Keep the process alive
server.on('error', (err) => {
    console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
});
