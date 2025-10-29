const CategoriaModel = require("../models/Categoria");
class Categoria {
  async buscar(req, res) {
    try {
      const categorias = await CategoriaModel.listarCategorias();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categorias" });
    }
  }
  criar() {
    return "Categoria criada com sucesso";
  }
  alterar(id) {
    return "Categoria " + id + " atualizada com sucesso";
  }
  apagar(id) {
    return "Categoria " + id + " deletada com sucesso";
  }
}

module.exports = new Categoria();
