const { Router } = require("express");
const router = Router();
const filialController = require("../controllers/filialController");

// Rotas do CRUD de Filiais

// GET - Listar filiais com filtros
router.get("/buscar", filialController.buscarPorFiltros);

// GET - Listar todas as filiais
router.get("/", filialController.buscarTodos);

// GET - Buscar uma filial por ID
router.get("/:id", filialController.buscarPorId);

// POST - Criar uma nova filial
router.post("/", filialController.criar);

// PUT - Atualizar uma filial
router.put("/:id", filialController.atualizar);

// DELETE - Deletar uma filial
router.delete("/:id", filialController.deletar);

module.exports = router;
