
const conexao = require('../config/db')
class CategoriaModel {

  async listarCategorias() {
    const sql = "SELECT * FROM categoria";
    const [rows] = await conexao.query(sql);
    return rows;
  }
}

module.exports = new CategoriaModel();