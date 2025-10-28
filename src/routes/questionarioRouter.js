const { Router } = require("express");
const router = Router();
const questionarioController = require("../controllers/questionarioController");

// Rotas do CRUD de Questionários

// GET - Listar todos os modelos de questionários
router.get("/", questionarioController.listarModelos);

// GET - Buscar um modelo de questionário por ID
router.get("/:id", questionarioController.buscarModeloPorId);

// POST - Criar um novo modelo de questionário
router.post("/", questionarioController.criarModelo);

// PUT - Atualizar um modelo de questionário
router.put("/:id", questionarioController.atualizarModelo);

// DELETE - Deletar um modelo de questionário
router.delete("/:id", questionarioController.deletarModelo);

module.exports = router;
