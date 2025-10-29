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

  // retorna perguntas associadas a um modelo com a ordem definida em modelo_pergunta
  async listarPerguntasModelo(id_modelo) {
    const sql = `SELECT p.id_pergunta, p.conteudo, p.tipo, p.id_categoria, mp.ordem
                 FROM modelo_pergunta mp
                 JOIN pergunta p ON mp.id_pergunta = p.id_pergunta
                 WHERE mp.id_modelo = ?
                 ORDER BY mp.ordem`;
    const [rows] = await db.query(sql, [id_modelo]);
    return rows;
  }

  // substitui a lista de perguntas de um modelo (transacional)
  async substituirPerguntasModelo(id_modelo, perguntas) {
    // perguntas: array de { id_pergunta, ordem }
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      // remover existentes
      await conn.query('DELETE FROM modelo_pergunta WHERE id_modelo = ?', [id_modelo]);

      if (perguntas && perguntas.length) {
        const values = perguntas.map(p => [id_modelo, p.id_pergunta, p.ordem]);
        const insertSql = 'INSERT INTO modelo_pergunta (id_modelo, id_pergunta, ordem) VALUES ?';
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
}

module.exports = new QuestionarioModel();
