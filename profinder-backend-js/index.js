require('dotenv').config(); 
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// esta es la Configuración modular de PostgreSQL usando las variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Verificación de la conexión
pool.connect()
  .then(() => console.log('¡Conexión a PostgreSQL establecida, ostras'))
  .catch(err => console.error('Error al conectar a la base de datos:', err.stack));

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('El servidor backend de ProFinder si jala, soy una pistola');
});

// Encender el servidor usando el puerto del archivo .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en http://localhost:${PORT}`);
});