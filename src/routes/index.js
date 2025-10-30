const routerCliente = require('./clienteRouter');
const routerCategoria = require('./categoriaRouter');
const routerQuestionario = require('./questionarioRouter');
const routerPergunta = require('./perguntaRouter');

module.exports = (app) => {
  app.use('/api/clientes', routerCliente);
  app.use('/api/categorias', routerCategoria);
  app.use('/api/perguntas', routerPergunta);
  app.use('/api/questionarios', routerQuestionario);
};
