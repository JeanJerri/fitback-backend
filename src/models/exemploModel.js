const db = require('../config/db');

async function getUsuarios() {
  const [rows] = await db.query('SELECT * FROM usuarios');
  return rows;
}

module.exports = { getUsuarios };
