const mysql = require('mysql2/promise');

// Usando la URL completa de Railway
const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root:tVJKGpEEurSAeqXQsxlPlSabufKqYIvj@interchange.proxy.rlwy.net:50185/railway';

const pool = mysql.createPool({
  uri: DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false } // necesario para la conexión en la nube
});

module.exports = pool;

async function verificarConexion() {
  try {
    const connection = await pool.getConnection();
    await connection.query('SELECT 1');
    console.log('✅ Conexión a la base de datos MySQL exitosa');
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    process.exit(1);
  }
}

verificarConexion();
