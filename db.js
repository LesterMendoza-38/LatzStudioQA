const { Pool } = require('pg');

// Render te da una URL completa, es más fácil usarla así:
const connectionString = process.env.DATABASE_URL || 'postgresql://latzstudio_user:UEby3FyxnlpCKGN1cCS4K1DSiOJhi8T4@dpg-d7in59flk1mc73a1g3b0-a/latzstudio';

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
