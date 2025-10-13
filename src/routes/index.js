const express = require('express');
const router = express.Router();

const routerCliente = require('./clienteRouter');
const routerCategoria = require('./categoriaRouter');
const healthController = require('../controllers/healthController');

module.exports = (app) => {
  app.get('/api/health', healthController.check);
  app.use('/api/clientes', routerCliente);
  app.use('/api/categorias', routerCategoria);
};
