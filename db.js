const { Pool } = require('pg');

// Render te da una URL completa, es más fácil usarla así:
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:tu_password_local@localhost:5432/latz_studio';

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // Obligatorio para conexiones seguras en Render
  }
});

pool.on('connect', () => {
  console.log('✅ Conectado a la base de datos de Render');
});

module.exports = pool;
