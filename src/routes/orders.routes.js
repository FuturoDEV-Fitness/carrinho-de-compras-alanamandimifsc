const { Router } = require('express');
const OrderController = require('../controllers/OrderController');

const ordersRoutes = Router();

ordersRoutes.post('/', OrderController.create.bind(OrderController));

module.exports = ordersRoutes;
