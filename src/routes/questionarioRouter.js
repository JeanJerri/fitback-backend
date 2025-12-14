const { Router } = require("express");
const router = Router();
const questionarioController = require("../controllers/questionarioController");

// Rotas do CRUD de Questionários

// GET - Listar questionários com filtros
router.get("/buscar", questionarioController.buscarPorFiltros);

// GET - Listar todos os modelos de questionários
router.get("/", questionarioController.buscarTodos);

// GET - Buscar um modelo de questionário por ID
router.get("/:id", questionarioController.buscarPorId);

// GET - Buscar perguntas associadas a um modelo
router.get("/:id/perguntas", questionarioController.buscarPerguntas);

// POST - Criar um novo modelo de questionário
router.post("/", questionarioController.criar);

// PUT - Atualizar um modelo de questionário
router.put("/:id", questionarioController.atualizar);

// POST - Substituir perguntas de um modelo (envia array de { id_pergunta, ordem })
router.post("/:id/perguntas", questionarioController.substituirPerguntas);

// DELETE - Deletar um modelo de questionário
router.delete("/:id", questionarioController.deletar);

// PUT - Atualizar a ordem das perguntas de um modelo
router.put(
  "/:id/ordem-perguntas",
  questionarioController.atualizarOrdemPerguntas
);

module.exports = router;
