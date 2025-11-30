const conexao = require("../config/db");

class PerguntaModel {

  async listarPerguntas() {
    const sqlPergunta = "SELECT * FROM pergunta";
    const [perguntas] = await conexao.query(sqlPergunta);

    for (const pergunta of perguntas) {
      const sqlOpcao = "SELECT * FROM opcao_pergunta WHERE id_pergunta = ?";
      const [opcoes] = await conexao.query(sqlOpcao, [pergunta.id_pergunta]);

      pergunta.opcoes = opcoes;
    }

    return perguntas;
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
      data.obrigatoria || false,
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
    const sql =
      "SELECT p.* FROM pergunta p JOIN modelo_pergunta mp ON p.id_pergunta = mp.id_pergunta WHERE mp.id_modelo = ? ORDER BY mp.ordem";
    const [rows] = await conexao.query(sql, [idModelo]);
    return rows;
  }

  async listarPorFiltros({ termo, idCategoria, tipo } = {}) {
    let sql = `SELECT p.*, c.nome as categoria
               FROM pergunta p
               JOIN categoria c ON p.id_categoria = c.id_categoria`;

    const conditions = [];
    const params = [];

    if (termo) {
      conditions.push("p.conteudo LIKE ?");
      params.push(`%${termo}%`);
    }
    if (idCategoria && idCategoria !== "Todas") {
      conditions.push("c.id_categoria = ?");
      params.push(idCategoria);
    }
    if (tipo && tipo !== "Todas") {
      conditions.push("p.tipo = ?");
      params.push(tipo);
    }

    if (conditions.length) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY p.ordem_exibicao, p.id_pergunta";

    const [rows] = await conexao.query(sql, params);
    return rows;
  }
}

module.exports = new PerguntaModel();
