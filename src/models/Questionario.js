const db = require("../config/db");

class QuestionarioModel {
  async listarModelos() {
    const sql = "SELECT * FROM questionario_modelo";
    const [rows] = await db.query(sql);
    return rows;
  }

  async buscarModeloPorId(id) {
    const sql = "SELECT * FROM questionario_modelo WHERE id_modelo = ?";
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  }

  async criarModelo(data) {
    const sql =
      "INSERT INTO questionario_modelo (nome, descricao, criado_por) VALUES (?, ?, ?)";
    const [result] = await db.query(sql, [
      data.nome,
      data.descricao,
      data.criado_por,
    ]);
    return result.insertId;
  }

  async atualizarModelo(id, data) {
    const sql =
      "UPDATE questionario_modelo SET nome = ?, descricao = ? WHERE id_modelo = ?";
    await db.query(sql, [data.nome, data.descricao, id]);
  }

  async deletarModelo(id) {
    const sql = "DELETE FROM questionario_modelo WHERE id_modelo = ?";
    await db.query(sql, [id]);
  }
}

module.exports = new QuestionarioModel();
