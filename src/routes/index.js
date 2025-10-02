const express = require('express');
const healthController = require('../controllers/healthController');

const router = express.Router();

// Rota para checar se está rodando
router.get('/health', healthController.check);

module.exports = router;
