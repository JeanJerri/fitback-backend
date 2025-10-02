const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fitback',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testa conexão ao iniciar
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Conexão com MySQL estabelecida!');
    conn.release();
  } catch (err) {
    console.error('❌ Erro ao conectar no MySQL:', err.message);
  }
})();

module.exports = pool;
