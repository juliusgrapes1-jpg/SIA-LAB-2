const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3000;

app.get('/api/dashboard', async (req, res) => {
    try {
        console.log('API Gateway: Fetching data from microservices...');
        const [usersRes, productsRes, ordersRes] = await Promise.all([
            axios.get('http://localhost:5001/users'),
            axios.get('http://localhost:5002/products'),
            axios.get('http://localhost:5003/orders')
        ]);

        res.json({
            message: 'Dashboard aggregated successfully via Hub-and-Spoke Gateway',
            status: 'success',
            data: {
                users: usersRes.data,
                products: productsRes.data,
                orders: ordersRes.data
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('API Gateway Error:', error.message);
        res.status(500).json({ 
            status: 'error',
            message: 'Failed to fetch microservices data', 
            details: error.message 
        });
    }
});

app.get('/api/status', async (req, res) => {
    res.json({ 
        gateway: 'online', 
        port: PORT,
        timestamp: new Date().toISOString() 
    });
});

app.listen(PORT, () => {
    console.log('='.repeat(40));
    console.log('API GATEWAY (HUB) STARTED');
    console.log('='.repeat(40));
    console.log(`Port: ${PORT}`);
    console.log(`GET /api/dashboard - Aggregated hub route`);
    console.log(`GET /api/status - Gateway health status`);
    console.log('='.repeat(40));
});