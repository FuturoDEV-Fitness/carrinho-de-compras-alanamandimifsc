const express = require('express');

const clientsRoutes = require('./src/routes/clients.routes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/client', clientsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);