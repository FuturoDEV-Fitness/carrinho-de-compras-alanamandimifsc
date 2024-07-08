const { Router } = require('express');
const CategoriesController = require('../controllers/CategoriesController');

const categoriesRoutes = Router();

categoriesRoutes.get('/', CategoriesController.read.bind(CategoriesController));

module.exports = categoriesRoutes;
