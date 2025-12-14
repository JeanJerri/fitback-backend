const { Router } = require("express");
const router = Router();
const perguntaController = require("../controllers/perguntaController");

// Rotas do CRUD de Perguntas

// GET - Listar perguntas com filtros
router.get("/buscar", perguntaController.buscarPorFiltros);

// GET - Listar todas as perguntas
router.get("/", perguntaController.buscarTodos);

// GET - Buscar uma pergunta por ID
router.get("/:id", perguntaController.buscarPorId);

// POST - Criar uma nova pergunta
router.post("/", perguntaController.criar);

// PUT - Atualizar uma pergunta
router.put("/:id", perguntaController.atualizar);

// DELETE - Deletar uma pergunta
router.delete("/:id", perguntaController.deletar);

module.exports = router;
