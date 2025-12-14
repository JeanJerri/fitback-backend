const db = require("../config/db");

class FilialModel {
  async buscarTodos() {
    const sql = "SELECT * FROM filial";
    const [rows] = await db.query(sql);
    return rows;
  }

  async buscarPorId(id) {
    const sql = "SELECT * FROM filial WHERE id_filial = ?";
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  }

  async criar(data) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const { nome, endereco, status } = data;

      const [duplicado] = await conn.query(
        "SELECT id_filial FROM filial WHERE nome = ? AND endereco = ?",
        [nome, endereco]
      );
      if (duplicado.length > 0) {
        throw new Error("Essa filial já está cadastrada.");
      }

      const [nomeRows] = await conn.query(
        "SELECT id_filial FROM filial WHERE nome = ?",
        [nome]
      );
      if (nomeRows.length > 0) {
        throw new Error("Já existe uma filial cadastrada com esse nome.");
      }

      const [enderecoRows] = await conn.query(
        "SELECT id_filial FROM filial WHERE endereco = ?",
        [endereco]
      );
      if (enderecoRows.length > 0) {
        throw new Error("Já existe uma filial cadastrada com esse endereço.");
      }

      const sql = `
      INSERT INTO filial (nome, endereco, status)
      VALUES (?, ?, ?)
    `;

      const [result] = await conn.query(sql, [
        nome,
        endereco,
        status || "ativa",
      ]);

      await conn.commit();
      return result.insertId;
    } catch (error) {
      await conn.rollback();
      console.error("Erro ao criar filial:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  async atualizar(id, data) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const { nome, endereco, status } = data;

      const [filialRows] = await conn.query(
        "SELECT id_filial FROM filial WHERE id_filial = ?",
        [id]
      );
      if (filialRows.length === 0) {
        throw new Error("Filial não encontrada.");
      }

      if (nome) {
        const [nomeRows] = await conn.query(
          "SELECT id_filial FROM filial WHERE nome = ? AND id_filial != ?",
          [nome, id]
        );
        if (nomeRows.length > 0) {
          throw new Error("Já existe outra filial cadastrada com esse nome.");
        }
      }

      if (endereco) {
        const [enderecoRows] = await conn.query(
          "SELECT id_filial FROM filial WHERE endereco = ? AND id_filial != ?",
          [endereco, id]
        );
        if (enderecoRows.length > 0) {
          throw new Error(
            "Já existe outra filial cadastrada com esse endereço."
          );
        }
      }

      const sql = `
      UPDATE filial
      SET nome = ?, endereco = ?, status = ?
      WHERE id_filial = ?
    `;

      await conn.query(sql, [nome, endereco, status, id]);

      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      console.error("Erro ao editar filial:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  async deletar(id) {
    const sql = "DELETE FROM filial WHERE id_filial = ?";
    await db.query(sql, [id]);
  }

  async buscarPorFiltros({ termo } = {}) {
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

    const [rows] = await db.query(sql, params);
    return rows;
  }
}

module.exports = new FilialModel();
