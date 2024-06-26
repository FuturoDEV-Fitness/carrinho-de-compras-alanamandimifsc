const express = require('express');

const clientsRoutes = require('./src/routes/clients.routes');
const productsRoutes = require('./src/routes/products.routes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/client', clientsRoutes);
app.use('/product', productsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);