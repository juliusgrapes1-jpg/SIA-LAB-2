const express = require('express');
const app = express();
const PORT = 5002;

const products = [
    { id: 101, title: 'Laptop', price: 1200, category: 'Electronics' },
    { id: 102, title: 'Mouse', price: 25, category: 'Accessories' },
    { id: 103, title: 'Keyboard', price: 75, category: 'Accessories' },
    { id: 104, title: 'Monitor', price: 300, category: 'Electronics' }
];

app.get('/products', (req, res) => {
    console.log('Product Service: Returning', products.length, 'products');
    res.json({
        service: 'Product Service',
        status: 'success',
        count: products.length,
        data: products,
        timestamp: new Date().toISOString()
    });
});

app.get('/ping', (req, res) => {
    res.json({ status: 'online', service: 'Product Service' });
});

app.listen(PORT, () => {
    console.log('='.repeat(40));
    console.log('PRODUCT SERVICE STARTED');
    console.log('='.repeat(40));
    console.log(`Port: ${PORT}`);
    console.log(`GET /products - Returns ${products.length} products`);
    console.log(`GET /ping - Health check`);
    console.log('='.repeat(40));
});