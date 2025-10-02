const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(express.json());

// Rotas
app.use('/api', routes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Backend está rodando 🚀');
});

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
