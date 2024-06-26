const { Router } = require('express');
const ProductController = require('../controllers/ProductController');

const productsRoutes = Router();

productsRoutes.post('/', ProductController.create.bind(ProductController));
productsRoutes.get('/', ProductController.index.bind(ProductController));

module.exports = productsRoutes;
