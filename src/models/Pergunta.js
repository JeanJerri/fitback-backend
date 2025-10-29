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
      "INSERT INTO pergunta (id_categoria, tipo, ordem_exibicao, conteudo, permite_multiplas, obrigatoria) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await conexao.query(sql, [
      data.id_categoria,
      data.tipo,
      data.ordem_exibicao,
      data.conteudo,
      data.permite_multiplas || false,
      data.obrigatoria || false    
    ]);
    return result.insertId;
  }

  async atualizarPergunta(id, data) {
    const sql =
      "UPDATE pergunta SET id_categoria = ?, tipo = ?, ordem_exibicao = ?, conteudo = ?, permite_multiplas = ?, obrigatoria = ? WHERE id_pergunta = ?";
    await conexao.query(sql, [
      data.id_categoria,
      data.tipo,
      data.ordem_exibicao,
      data.conteudo,
      data.permite_multiplas,
      data.obrigatoria,    
      id,
    ]);
  }

  async deletarPergunta(id) {
    const sql = "DELETE FROM pergunta WHERE id_pergunta = ?";
    await conexao.query(sql, [id]);
  }

  async buscarPerguntasPeloModelo(idModelo) {
    const sql = "SELECT p.* FROM pergunta p JOIN modelo_pergunta mp ON p.id_pergunta = mp.id_pergunta WHERE mp.id_modelo = ? ORDER BY mp.ordem";
    const [rows] = await conexao.query(sql, [idModelo]);
    return rows;
  }
}

module.exports = new PerguntaModel();
