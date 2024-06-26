const { Router } = require('express');
const ClientsController = require('../controllers/ClientController');
const validateClient = require('../middleware/validateClient');

const clientsRoutes = Router();

clientsRoutes.post('/', validateClient, ClientsController.create.bind(ClientsController));

module.exports = clientsRoutes;
