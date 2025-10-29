const db = require('../config/db');

class PerguntaModel {
  async listar({ search, categoria, tipo } = {}) {
    // base query
    let sql = `SELECT p.id_pergunta, p.conteudo, p.tipo, p.ordem_exibicao, p.id_categoria, c.nome as categoria
               FROM pergunta p
               JOIN categoria c ON p.id_categoria = c.id_categoria`;

    const conditions = [];
    const params = [];

    if (search) {
      conditions.push('p.conteudo LIKE ?');
      params.push(`%${search}%`);
    }
    if (categoria && categoria !== 'Todas') {
      conditions.push('c.nome = ?');
      params.push(categoria);
    }
    if (tipo && tipo !== 'Todas') {
      conditions.push('p.tipo = ?');
      params.push(tipo);
    }

    if (conditions.length) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY p.ordem_exibicao, p.id_pergunta';

    const [rows] = await db.query(sql, params);
    return rows;
  }
}

module.exports = new PerguntaModel();
