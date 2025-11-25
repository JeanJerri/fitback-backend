const conexao = require("../config/db");

class FilialModel {
  async listarFiliais() {
    const sql = "SELECT * FROM filial";
    const [rows] = await conexao.query(sql);
    return rows;
  }

  async buscarFilialPorId(id) {
    const sql = "SELECT * FROM filial WHERE id_filial = ?";
    const [rows] = await conexao.query(sql, [id]);
    return rows[0];
  }

  async criarFilial(data) {
    const sql = "INSERT INTO filial (nome, endereco, status) VALUES (?, ?, ?)";
    const [result] = await conexao.query(sql, [
      data.nome,
      data.endereco,
      data.status || "ativo",
    ]);
    return result.insertId;
  }

  async atualizarFilial(id, data) {
    const sql =
      "UPDATE filial SET nome = ?, endereco = ?, status = ? WHERE id_filial = ?";
    await conexao.query(sql, [data.nome, data.endereco, data.status, id]);
  }

  async deletarFilial(id) {
    const sql = "DELETE FROM filial WHERE id_filial = ?";
    await conexao.query(sql, [id]);
  }

  async buscarFilialPorFiltros({ termo } = {}) {
    console.log(termo)
    let sql = `SELECT * FROM filial`;

    const conditions = [];
    const params = [];

    if (termo) {
      conditions.push("(nome LIKE ? OR endereco LIKE ?)");
      params.push(`%${termo}%`, `%${termo}%`);
    }

    if (conditions.length) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY nome, endereco";

    const [rows] = await conexao.query(sql, params);
    return rows;
  }
}

module.exports = new FilialModel();
