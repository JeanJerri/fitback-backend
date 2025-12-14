const db = require("../config/db");

class PerguntaModel {
  async buscarTodos() {
    const sqlPerguntas = `
      SELECT 
        p.*, 
        c.nome AS categoria_nome
      FROM pergunta p
      JOIN categoria c ON c.id_categoria = p.id_categoria
    `;

    const [perguntas] = await db.query(sqlPerguntas);

    const sqlOpcoes = "SELECT * FROM opcao_pergunta WHERE id_pergunta = ?";

    for (const pergunta of perguntas) {
      pergunta.obrigatoria = Boolean(pergunta.obrigatoria);
      pergunta.permite_multiplas = Boolean(pergunta.permite_multiplas);

      const [opcoes] = await db.query(sqlOpcoes, [pergunta.id_pergunta]);

      opcoes.forEach((op) => {
        if ("correta" in op) op.correta = Boolean(op.correta);
      });

      pergunta.opcoes = opcoes;
    }
    return perguntas;
  }

  async buscarPorId(id) {
    const sql = "SELECT * FROM pergunta WHERE id_pergunta = ?";
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  }

  async criar(data) {
    const [existe] = await db.query(
      `SELECT id_pergunta FROM pergunta 
     WHERE conteudo = ? AND id_categoria = ?`,
      [data.conteudo, data.id_categoria]
    );

    if (existe.length > 0) {
      throw new Error(
        "Já existe uma pergunta com esse conteúdo nesta categoria."
      );
    }

    const sqlPergunta = `
      INSERT INTO pergunta 
      (id_categoria, tipo, ordem_exibicao, conteudo, permite_multiplas, obrigatoria, status_pergunta)
      VALUES (?, ?, ?, ?, ?, ?, 'ativo')
    `;

    const [result] = await db.query(sqlPergunta, [
      data.id_categoria,
      data.tipo,
      data.ordem_exibicao,
      data.conteudo,
      data.permite_multiplas || false,
      data.obrigatoria || false,
    ]);

    const idPergunta = result.insertId;

    if (data.tipo === "multipla_escolha" && Array.isArray(data.opcoes)) {
      const sqlOpcao = `
      INSERT INTO opcao_pergunta (id_pergunta, texto, ordem, ativo, tem_campo_outro)
      VALUES (?, ?, ?, ?, ?)
    `;

      for (const opcao of data.opcoes) {
        await db.query(sqlOpcao, [
          idPergunta,
          opcao.texto,
          data.opcoes.indexOf(opcao),
          true,
          false,
        ]);
      }
    }

    return idPergunta;
  }

  async atualizar(id, data) {
    const [existe] = await db.query(
      `SELECT id_pergunta FROM pergunta 
     WHERE conteudo = ? AND id_categoria = ? AND id_pergunta <> ?`,
      [data.conteudo, data.id_categoria, id]
    );

    if (existe.length > 0) {
      throw new Error(
        "Já existe outra pergunta com esse conteúdo nesta categoria."
      );
    }

    const sql = `
      UPDATE pergunta 
      SET 
        id_categoria = ?, 
        tipo = ?, 
        ordem_exibicao = ?, 
        conteudo = ?, 
        permite_multiplas = ?, 
        obrigatoria = ?,
        status_pergunta = COALESCE(?, status_pergunta)
      WHERE id_pergunta = ?
    `;

    await db.query(sql, [
      data.id_categoria,
      data.tipo,
      data.ordem_exibicao,
      data.conteudo,
      data.permite_multiplas || 0,
      data.obrigatoria || 0,
      data.status_pergunta,
      id,
    ]);

    if (data.tipo !== "multipla_escolha") {
      await db.query("DELETE FROM opcao_pergunta WHERE id_pergunta = ?", [id]);
      return;
    }

    const [opcoesAtuais] = await db.query(
      "SELECT id_opcao FROM opcao_pergunta WHERE id_pergunta = ?",
      [id]
    );

    const idsAtuais = opcoesAtuais.map((o) => o.id_opcao);
    const idsNovos = data.opcoes
      .filter((o) => o.id_opcao)
      .map((o) => o.id_opcao);

    const idsParaRemover = idsAtuais.filter(
      (idOpt) => !idsNovos.includes(idOpt)
    );

    if (idsParaRemover.length > 0) {
      await db.query(
        `DELETE FROM opcao_pergunta WHERE id_opcao IN (${idsParaRemover.join(
          ","
        )})`
      );
    }

    for (const opc of data.opcoes) {
      if (opc.id_opcao) {
        await db.query(
          "UPDATE opcao_pergunta SET texto = ? WHERE id_opcao = ?",
          [opc.texto, opc.id_opcao]
        );
      } else {
        await db.query(
          "INSERT INTO opcao_pergunta (id_pergunta, texto) VALUES (?, ?)",
          [id, opc.texto]
        );
      }
    }
  }

  async deletar(id) {
    await db.query("DELETE FROM opcao_pergunta WHERE id_pergunta = ?", [id]);

    await db.query("DELETE FROM pergunta WHERE id_pergunta = ?", [id]);
  }

  async buscarPeloModelo(idModelo) {
    const sql = `
    SELECT 
      p.*,
      c.nome AS nome_categoria
    FROM pergunta p
    JOIN modelo_pergunta mp 
      ON p.id_pergunta = mp.id_pergunta
    JOIN categoria c 
      ON p.id_categoria = c.id_categoria
    WHERE mp.id_modelo = ?
    ORDER BY mp.ordem ASC
  `;

    const [rows] = await db.query(sql, [idModelo]);
    return rows;
  }

  async buscarPorFiltros({ termo, idCategoria, tipo } = {}) {
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

    const [rows] = await db.query(sql, params);
    return rows;
  }
}

module.exports = new PerguntaModel();
