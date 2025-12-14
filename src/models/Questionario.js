const db = require("../config/db");
const { buscarPerguntasPeloModelo } = require("./Pergunta");

class QuestionarioModel {
  async buscarTodos() {
    const sqlModelo = "SELECT * FROM questionario_modelo";
    const [rows] = await db.query(sqlModelo);
    for (const modelo of rows) {
      const perguntas = await buscarPerguntasPeloModelo(modelo.id_modelo);
      modelo.perguntas = perguntas;
    }
    return rows;
  }

  async buscarPorId(id) {
    const sqlModelo = "SELECT * FROM questionario_modelo WHERE id_modelo = ?";
    const [rows] = await db.query(sqlModelo, [id]);

    if (rows.length === 0) {
      return null;
    }

    const perguntas = await buscarPerguntasPeloModelo(id);

    return {
      ...rows[0],
      perguntas,
    };
  }

  async criar(data) {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [nomeExistente] = await conn.query(
        "SELECT id_modelo FROM questionario_modelo WHERE nome = ?",
        [data.nome]
      );

      if (nomeExistente.length > 0) {
        throw new Error("MODELO_DUPLICADO");
      }

      const perguntasIdsUnicos = [...new Set(data.perguntasIds)];

      const [perguntasValidas] = await conn.query(
        `SELECT id_pergunta FROM pergunta WHERE id_pergunta IN (?)`,
        [perguntasIdsUnicos]
      );

      if (perguntasValidas.length !== perguntasIdsUnicos.length) {
        throw new Error("PERGUNTA_INVALIDA");
      }

      const sqlModelo = `
      INSERT INTO questionario_modelo (nome, descricao, criado_por)
      VALUES (?, ?, ?)
    `;

      const [result] = await conn.query(sqlModelo, [
        data.nome,
        data.descricao,
        data.criado_por || null,
      ]);

      const questionarioId = result.insertId;

      const sqlAssociarPergunta = `
      INSERT INTO modelo_pergunta (id_modelo, id_pergunta, ordem)
      VALUES (?, ?, ?)
    `;

      for (let i = 0; i < perguntasIdsUnicos.length; i++) {
        await conn.query(sqlAssociarPergunta, [
          questionarioId,
          perguntasIdsUnicos[i],
          i,
        ]);
      }

      await conn.commit();
      return questionarioId;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }

  async atualizar(idModelo, data) {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();

      const [modeloRows] = await conn.query(
        "SELECT id_modelo FROM questionario_modelo WHERE id_modelo = ?",
        [idModelo]
      );

      if (modeloRows.length === 0) {
        throw new Error("Modelo de questionário não encontrado.");
      }

      if (data.nome) {
        const [nomeRows] = await conn.query(
          `
        SELECT id_modelo 
        FROM questionario_modelo 
        WHERE nome = ? AND id_modelo != ?
        `,
          [data.nome, idModelo]
        );

        if (nomeRows.length > 0) {
          throw new Error("Já existe um questionário com esse nome.");
        }
      }

      if (Array.isArray(data.perguntasIds)) {
        if (data.perguntasIds.length === 0) {
          throw new Error("O questionário deve possuir ao menos uma pergunta.");
        }

        const uniqueIds = new Set(data.perguntasIds);
        if (uniqueIds.size !== data.perguntasIds.length) {
          throw new Error("A lista de perguntas contém IDs duplicados.");
        }

        const [perguntasValidas] = await conn.query(
          `
        SELECT id_pergunta 
        FROM pergunta 
        WHERE id_pergunta IN (?)
        `,
          [data.perguntasIds]
        );

        if (perguntasValidas.length !== data.perguntasIds.length) {
          throw new Error("Uma ou mais perguntas informadas não existem.");
        }

        for (let i = 0; i < data.perguntasIds.length; i++) {
          await conn.query(
            `
          UPDATE modelo_pergunta
          SET ordem = ?
          WHERE id_modelo = ? AND id_pergunta = ?
          `,
            [i, idModelo, data.perguntasIds[i]]
          );
        }
      }

      await conn.query(
        `
      UPDATE questionario_modelo
      SET nome = ?, descricao = ?
      WHERE id_modelo = ?
      `,
        [data.nome, data.descricao, idModelo]
      );

      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      console.error("Erro ao atualizar modelo:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  async deletar(id) {
    const sql = "DELETE FROM questionario_modelo WHERE id_modelo = ?";
    await db.query(sql, [id]);
  }

  async buscarPerguntas(id_modelo) {
    const sql = `SELECT p.id_pergunta, p.conteudo, p.tipo, p.id_categoria, mp.ordem
                 FROM modelo_pergunta mp
                 JOIN pergunta p ON mp.id_pergunta = p.id_pergunta
                 WHERE mp.id_modelo = ?
                 ORDER BY mp.ordem ASC`;
    const [rows] = await db.query(sql, [id_modelo]);
    return rows;
  }

  async substituirPerguntas(id_modelo, perguntas) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      await conn.query("DELETE FROM modelo_pergunta WHERE id_modelo = ?", [
        id_modelo,
      ]);

      if (perguntas && perguntas.length) {
        const values = perguntas.map((p) => [
          id_modelo,
          p.id_pergunta,
          p.ordem,
        ]);
        const insertSql =
          "INSERT INTO modelo_pergunta (id_modelo, id_pergunta, ordem) VALUES ?";
        await conn.query(insertSql, [values]);
      }

      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  async buscarPorFiltros(query) {
    const termo = `%${query}%`;

    const sql = `
    SELECT *
    FROM questionario_modelo
    WHERE id_modelo LIKE ?
       OR nome LIKE ?
       OR descricao LIKE ?
    ORDER BY id_modelo DESC
  `;

    const [rows] = await db.query(sql, [termo, termo, termo]);
    return rows;
  }

  async atualizarOrdemPerguntas(idModelo, perguntasIds) {
    const conn = await db.getConnection();

    try {
      await conn.beginTransaction();
      for (let i = 0; i < perguntasIds.length; i++) {
        await conn.query(
          `
        UPDATE modelo_pergunta
        SET ordem = ?
        WHERE id_modelo = ? AND id_pergunta = ?
        `,
          [i, idModelo, perguntasIds[i]]
        );
      }

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}

module.exports = new QuestionarioModel();
