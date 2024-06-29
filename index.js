const express = require('express');

const clientsRoutes = require('./src/routes/clients.routes');
const productsRoutes = require('./src/routes/products.routes');
const ordersRoutes = require('./src/routes/orders.routes');
const orderItemsRoutes = require('./src/routes/orderitens.routes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/client', clientsRoutes);
app.use('/product', productsRoutes);
app.use('/order', ordersRoutes);
app.use('/order-item', orderItemsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);