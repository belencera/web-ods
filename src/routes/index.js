/**
 * Rutas principales de la API
 * Aquí definirás tus endpoints
 */

const express = require('express');
const router = express.Router();

// Ejemplo de ruta
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// Aquí agregarás más rutas
// router.use('/payments', require('./payments'));

module.exports = router;

