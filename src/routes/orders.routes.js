const { Router } = require('express');
const OrderController = require('../controllers/OrderController');

const ordersRoutes = Router();

ordersRoutes.post('/', OrderController.create.bind(OrderController));
ordersRoutes.get('/open', OrderController.readOpen.bind(OrderController));
ordersRoutes.get('/:client_id', OrderController.read.bind(OrderController));
module.exports = ordersRoutes;
