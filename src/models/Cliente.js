const db = require("../config/db");

class ClienteModel {
  async getByNameOrCpf(termo) {
    const sql = `
      SELECT
        u.id_usuario, u.nome, u.email, u.cpf, u.tipo, u.status, u.data_cadastro,
        c.id_cliente, c.telefone, c.matricula, c.status_aluno, c.data_desistencia
      FROM usuario u
      JOIN cliente c ON u.id_usuario = c.id_usuario
      WHERE u.nome LIKE ? OR u.cpf LIKE ?
    `;

    const [rows] = await db.query(sql, [`%${termo}%`, `%${termo}%`]);
    console.log(rows);
    return rows;
  }

  async getAll() {
    const sql = `
      SELECT 
        u.id_usuario, u.nome, u.email, u.cpf, u.tipo, u.status, u.data_cadastro,
        c.id_cliente, c.telefone, c.matricula, c.status_aluno, c.data_desistencia
      FROM usuario u
      JOIN cliente c ON u.id_usuario = c.id_usuario
    `;
    const [rows] = await db.query(sql);
    return rows;
  }

  async getById(id_cliente) {
    const sql = `
      SELECT 
        u.id_usuario, u.nome, u.email, u.cpf, u.tipo, u.status,
        c.id_cliente, c.telefone, c.matricula, c.status_aluno, c.data_desistencia
      FROM usuario u
      JOIN cliente c ON u.id_usuario = c.id_usuario
      WHERE c.id_cliente = ?
    `;
    const [rows] = await db.query(sql, [id_cliente]);
    return rows[0];
  }

  async create(cliente) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const {
        nome,
        email,
        senha,
        cpf,
        status,
        telefone,
        matricula,
        status_aluno,
      } = cliente;

      const sqlUsuario =
        "INSERT INTO usuario (nome, email, senha_hash, tipo, cpf, status) VALUES (?, ?, ?, ?, ?, ?)";
      const [resultUsuario] = await conn.query(sqlUsuario, [
        nome,
        email,
        senha,
        "cliente",
        cpf,
        status || "ativo",
      ]);

      const id_usuario = resultUsuario.insertId;

      const sqlCliente =
        "INSERT INTO cliente (id_usuario, telefone, matricula, status_aluno) VALUES (?, ?, ?, ?)";
      const [resultCliente] = await conn.query(sqlCliente, [
        id_usuario,
        telefone,
        matricula,
        status_aluno || "frequente",
      ]);

      await conn.commit();

      return resultCliente.insertId;
    } catch (error) {
      await conn.rollback();
      console.error("Erro ao criar cliente:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  async update(id_cliente, cliente) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const [rows] = await conn.query(
        "SELECT id_usuario FROM cliente WHERE id_cliente = ?",
        [id_cliente]
      );
      if (rows.length === 0) {
        throw new Error("Cliente não encontrado");
      }
      const id_usuario = rows[0].id_usuario;

      const { telefone, matricula, status_aluno, data_desistencia } = cliente;
      const sqlCliente =
        "UPDATE cliente SET telefone = ?, matricula = ?, status_aluno = ?, data_desistencia = ? WHERE id_cliente = ?";
      await conn.query(sqlCliente, [
        telefone,
        matricula,
        status_aluno,
        data_desistencia,
        id_cliente,
      ]);

      const { nome, email, cpf, status } = cliente;
      const sqlUsuario =
        "UPDATE usuario SET nome = ?, email = ?, cpf = ?, status = ? WHERE id_usuario = ?";
      await conn.query(sqlUsuario, [nome, email, cpf, status, id_usuario]);

      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      console.error("Erro ao atualizar cliente:", error);
      throw error;
    } finally {
      conn.release();
    }
  }

  async del(id_cliente) {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const [rows] = await conn.query(
        "SELECT id_usuario FROM cliente WHERE id_cliente = ?",
        [id_cliente]
      );
      if (rows.length === 0) {
        await conn.rollback();
        return { affectedRows: 0 };
      }
      const id_usuario = rows[0].id_usuario;

      const [result] = await conn.query(
        "DELETE FROM usuario WHERE id_usuario = ?",
        [id_usuario]
      );

      await conn.commit();
      return result;
    } catch (error) {
      await conn.rollback();
      console.error("Erro ao deletar cliente:", error);
      throw error;
    } finally {
      conn.release();
    }
  }
}

module.exports = new ClienteModel();
