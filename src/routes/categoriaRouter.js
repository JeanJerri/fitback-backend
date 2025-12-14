const { Router } = require("express");
const router = Router();
const categoriaController = require("../controllers/categoriaController");

// Rotas do CRUD de Categorias

// GET - Listar todas as categorias
router.get("/", categoriaController.buscarTodos);

module.exports = router;
