const conexao = require("../config/db");

class PerguntaModel {
  async listarPerguntas() {
    const sql = "SELECT * FROM pergunta";
    const [rows] = await conexao.query(sql);
    return rows;
  }

  async buscarPerguntaPorId(id) {
    const sql = "SELECT * FROM pergunta WHERE id_pergunta = ?";
    const [rows] = await conexao.query(sql, [id]);
    return rows[0];
  }

  async criarPergunta(data) {
    const sql =
      "INSERT INTO pergunta (id_categoria, tipo, ordem_exibicao, conteudo) VALUES (?, ?, ?, ?)";
    const [result] = await conexao.query(sql, [
      data.id_categoria,
      data.tipo,
      data.ordem_exibicao,
      data.conteudo,
    ]);
    return result.insertId;
  }

  async atualizarPergunta(id, data) {
    const sql =
      "UPDATE pergunta SET id_categoria = ?, tipo = ?, ordem_exibicao = ?, conteudo = ? WHERE id_pergunta = ?";
    await conexao.query(sql, [
      data.id_categoria,
      data.tipo,
      data.ordem_exibicao,
      data.conteudo,
      id,
    ]);
  }

  async deletarPergunta(id) {
    const sql = "DELETE FROM pergunta WHERE id_pergunta = ?";
    await conexao.query(sql, [id]);
  }
}

module.exports = new PerguntaModel();
