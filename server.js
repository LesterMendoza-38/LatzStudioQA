const express = require("express");
const cors = require("cors");
const path = require("path");
const { sql, poolPromise } = require("./db"); // Importamos la conexión a SQL Server

const app = express();

// --- Configuración y Middlewares ---
app.use(cors()); // Esto permite que el celular entre al API
app.use(express.json()); // Necesario para leer los datos del login

// Hacer que la carpeta /img sea accesible
app.use('/img', express.static(path.join(__dirname, 'img')));

// --- Rutas ---

// Obtener productos para la tienda
app.get("/productos", async (req, res) => {
  try {
    // Agregamos el ORDER BY id para que no se mueva el catálogo
    const result = await pool.query("SELECT * FROM productos ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// Ruta de Login para validar con SQL Server
app.post("/login", async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('userName', sql.VarChar, usuario)
      .input('userPass', sql.VarChar, password)
      .query('SELECT nombre FROM usuarios WHERE nombre = @userName AND password = @userPass');

    if (result.recordset.length > 0) {
      // Si el usuario existe, devolvemos su nombre
      res.json({ success: true, nombre: result.recordset[0].nombre });
    } else {
      res.status(401).json({ success: false, message: "Usuario o clave incorrecta" });
    }
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// --- Iniciar Servidor ---
const port = process.env.PORT || 3000; // Usa el puerto de Render o el 3000 en local
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log("Conectado a SQL Server 2025");
});
