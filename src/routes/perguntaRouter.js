const { Router } = require('express');
const router = Router();
const perguntaController = require('../controllers/perguntaController');

// GET /api/perguntas - listar perguntas com filtros
router.get('/', perguntaController.listar);

module.exports = router;
