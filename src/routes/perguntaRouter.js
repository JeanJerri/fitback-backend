const { Router } = require("express");
const router = Router();
const perguntaController = require("../controllers/perguntaController");

// Rotas do CRUD de Perguntas

// GET - Listar perguntas com filtros
router.get("/buscar", perguntaController.buscarPerguntaPorQuery);

// GET - Listar todas as perguntas
router.get("/", perguntaController.listarPerguntas);

// GET - Buscar uma pergunta por ID
router.get("/:id", perguntaController.buscarPerguntaPorId);

// POST - Criar uma nova pergunta
router.post("/", perguntaController.criarPergunta);

// PUT - Atualizar uma pergunta
router.put("/:id", perguntaController.atualizarPergunta);

// DELETE - Deletar uma pergunta
router.delete("/:id", perguntaController.deletarPergunta);

module.exports = router;
