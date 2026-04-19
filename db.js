const sql = require("mssql");

const config = {
  user: "root", 
  password: "TuPasswordSeguro123", // Pon tu contraseña real aquí
  server: "127.0.0.1", 
  database: "latz_studio",
  port: 1433, 
  options: {
    encrypt: false, 
    trustServerCertificate: true 
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Conectado a SQL Server");
    return pool;
  })
  .catch(err => console.log("Error de conexión: ", err.message));

module.exports = { sql, poolPromise };