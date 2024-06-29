const { Router } = require('express');
const OrderItemController = require('../controllers/OrderItemController');

const orderitensRoutes = Router();

orderitensRoutes.post('/', OrderItemController.create.bind(OrderItemController));

module.exports = orderitensRoutes;
