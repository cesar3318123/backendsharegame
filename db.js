const mysql = require('mysql2/promise');

// Pool de conexiones configurado para Railway
const pool = mysql.createPool({
  host: process.env.DB_HOST,         // Ej: containers-us-west-xx.railway.app
  user: process.env.DB_USER,         // Usuario de la DB
  password: process.env.DB_PASSWORD, // Contraseña de la DB
  database: process.env.DB_NAME,     // Nombre de la DB
  port: Number(process.env.DB_PORT), // Puerto de la DB (ej: 5432 o 3306)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true        // Muy importante para conexiones seguras
  }
});

module.exports = pool;

// Verificación de conexión
async function verificarConexion() {
  try {
    const connection = await pool.getConnection();
    await connection.query('SELECT 1');
    console.log('✅ Conexión a la base de datos MySQL exitosa');
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    process.exit(1); // Detener la app si falla la conexión
  }
}

verificarConexion();
