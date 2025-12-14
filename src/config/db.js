const mysql = require("mysql2/promise");

console.log("--- Credenciais do Banco de Dados ---");
console.log("HOST:", process.env.DB_HOST);
console.log("USER:", process.env.DB_USER);
console.log(
  "PASSWORD:",
  process.env.DB_PASSWORD ? "********" : "Nenhuma senha definida"
);
console.log("DATABASE:", process.env.DB_NAME);
console.log("------------------------------------");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Conexão com MySQL estabelecida!");
    conn.release();
  } catch (err) {
    console.error("Erro ao conectar no MySQL:", err.message);
  }
})();

module.exports = pool;
