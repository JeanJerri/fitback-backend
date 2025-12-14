const db = require("../config/db");
class CategoriaModel {
  async buscarTodos() {
    const sql = "SELECT * FROM categoria";
    const [rows] = await db.query(sql);
    return rows;
  }
}

module.exports = new CategoriaModel();
