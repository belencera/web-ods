/**
 * Rutas principales de la API
 */

const express = require('express');
const router = express.Router();

// Ruta de salud del servidor
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// Ruta para contacto
router.use("/contact", require("./contact"));

// Ruta para checkout de planes
router.use("/checkout", require("./checkout"));


module.exports = router;

