/**
 * Servidor principal de la aplicación
 */

const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de seguridad para permitir conexiones internas (fetch) y scripts
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' http://localhost:3000;" +
    "connect-src 'self' http://localhost:3000 https://ipinfo.io;" +
    "script-src 'self' https://cdn.jsdelivr.net;" +
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;" +
    "img-src 'self' https://cdn.jsdelivr.net;"
  );
  next();
});

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API 
app.use('/api', require('./routes/index'));

// Ruta principal - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

module.exports = app;

