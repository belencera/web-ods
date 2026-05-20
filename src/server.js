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

// Middleware CORS
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://ondemand.com.ar'];
  
  if (allowedOrigins.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware de seguridad para permitir conexiones internas (fetch) y scripts
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' http://localhost:3000;" +
    "connect-src 'self' http://localhost:3000 https://ipinfo.io https://web-ods-api.onrender.com;" +
    "script-src 'self' https://cdn.jsdelivr.net https://code.jquery.com https://cdnjs.cloudflare.com;" +
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;" +
    "img-src 'self' https://cdn.jsdelivr.net;" +
    "font-src 'self' https://cdnjs.cloudflare.com;"
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

