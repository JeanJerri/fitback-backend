const { Router } = require('express');
const router = Router();
const clienteController = require('../controllers/clienteController');

// Rotas do CRUD de Clientes

// GET - Listar todos os clientes
router.get('/', clienteController.buscarTodos);

// GET - Buscar um cliente por ID
router.get('/:id', clienteController.buscarPorId);

// POST - Criar um novo cliente
router.post('/', clienteController.criar);

// PUT - Atualizar um cliente
router.put('/:id', clienteController.atualizar);

// DELETE - Deletar um cliente
router.delete('/:id', clienteController.apagar);


module.exports = router;	