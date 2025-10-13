const db = require('../config/db');

async function getAll() {
  const [rows] = await db.query('SELECT * FROM usuarios');
  return rows;
}

async function getById(id) {
  const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
}

// Adicione funções para criar, atualizar, deletar 

module.exports = { getAll, getById };