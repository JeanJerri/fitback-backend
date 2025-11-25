const routerCliente = require('./clienteRouter');
const routerCategoria = require('./categoriaRouter');
const routerQuestionario = require('./questionarioRouter');
const routerPergunta = require('./perguntaRouter');
const routerFilial = require('./filialRouter');

module.exports = (app) => {
  app.use('/api/clientes', routerCliente);
  app.use('/api/categorias', routerCategoria);
  app.use('/api/perguntas', routerPergunta);
  app.use('/api/questionarios', routerQuestionario);
  app.use('/api/filiais', routerFilial);
};
