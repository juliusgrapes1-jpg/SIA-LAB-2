const express = require('express');
const app = express();
const PORT = 5003;

const orders = [
    { id: 1001, userId: 1, item: 'Laptop', total: 1200, status: 'Completed' },
    { id: 1002, userId: 2, item: 'Mouse', total: 25, status: 'Pending' },
    { id: 1003, userId: 3, item: 'Keyboard', total: 75, status: 'Shipped' }
];

app.get('/orders', (req, res) => {
    console.log('Order Service: Returning', orders.length, 'orders');
    res.json({
        service: 'Order Service',
        status: 'success',
        count: orders.length,
        data: orders,
        timestamp: new Date().toISOString()
    });
});

app.get('/ping', (req, res) => {
    res.json({ status: 'online', service: 'Order Service' });
});

app.listen(PORT, () => {
    console.log('='.repeat(40));
    console.log('ORDER SERVICE STARTED');
    console.log('='.repeat(40));
    console.log(`Port: ${PORT}`);
    console.log(`GET /orders - Returns ${orders.length} orders`);
    console.log(`GET /ping - Health check`);
    console.log('='.repeat(40));
});