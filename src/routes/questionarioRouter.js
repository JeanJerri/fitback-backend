const { Router } = require("express");
const router = Router();
const questionarioController = require("../controllers/questionarioController");

// Rotas do CRUD de Questionários

// GET - Listar todos os modelos de questionários
router.get("/", questionarioController.listarModelos);

// GET - Buscar um modelo de questionário por ID
router.get("/:id", questionarioController.buscarModeloPorId);

// GET - Buscar perguntas associadas a um modelo
router.get("/:id/perguntas", questionarioController.listarPerguntasModelo);

// POST - Criar um novo modelo de questionário
router.post("/", questionarioController.criarModelo);

// PUT - Atualizar um modelo de questionário
router.put("/:id", questionarioController.atualizarModelo);

// POST - Substituir perguntas de um modelo (envia array de { id_pergunta, ordem })
router.post("/:id/perguntas", questionarioController.substituirPerguntasModelo);

// DELETE - Deletar um modelo de questionário
router.delete("/:id", questionarioController.deletarModelo);

module.exports = router;
