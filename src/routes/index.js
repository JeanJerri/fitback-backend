const express = require('express');
const healthController = require('../controllers/healthController');
const exemploModel = require('../models/exemploModel');

const router = express.Router();

// Rota para checar se está rodando
router.get('/health', healthController.check);

// Exemplo rota que lê do banco
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await exemploModel.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

module.exports = router;
