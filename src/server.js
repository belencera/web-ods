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
      // Permite conexiones y scripts desde el propio origen ('self') y localhost
      "default-src 'self' http://localhost:3000;" + 
      "connect-src 'self' http://localhost:3000;" + 
      "script-src 'self';" + 
      // Permite estilos en línea (unsafe-inline)
      "style-src 'self' 'unsafe-inline';"
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

