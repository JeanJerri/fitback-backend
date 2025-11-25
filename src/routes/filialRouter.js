const { Router } = require("express");
const router = Router();
const filialController = require("../controllers/filialController");

// Rotas do CRUD de Filiais

// GET - Listar filiais com filtros
router.get("/buscar", filialController.buscarFilialPorQuery);

// GET - Listar todas as filiais
router.get("/", filialController.listarFiliais);

// GET - Buscar uma filial por ID
router.get("/:id", filialController.buscarFilialPorId);

// POST - Criar uma nova filial
router.post("/", filialController.criarFilial);

// PUT - Atualizar uma filial
router.put("/:id", filialController.atualizarFilial);

// DELETE - Deletar uma filial
router.delete("/:id", filialController.deletarFilial);

module.exports = router;
