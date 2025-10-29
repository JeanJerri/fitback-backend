const express = require('express');
const router = express.Router();

const routerCliente = require('./clienteRouter');
const routerCategoria = require('./categoriaRouter');
const healthController = require('../controllers/healthController');
const routerQuestionario = require('./questionarioRouter');
const routerPergunta = require('./perguntaRouter');

module.exports = (app) => {
  app.get('/api/health', healthController.check);
  app.use('/api/clientes', routerCliente);
  app.use('/api/categorias', routerCategoria);
  app.use('/api/questionarios', routerQuestionario);
  app.use('/api/perguntas', routerPergunta);
};
