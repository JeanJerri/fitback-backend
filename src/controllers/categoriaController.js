const CategoriaModel = require("../models/Categoria");

class CategoriaController {
  async buscarTodos(req, res) {
    try {
      const categorias = await CategoriaModel.buscarTodos();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categorias" });
    }
  }
}

module.exports = new CategoriaController();
