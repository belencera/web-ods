/**
 * Configuración de Stripe
 * Este archivo se usará cuando implementes los pagos con Stripe
 */

require('dotenv').config();

// Ejemplo de configuración (descomenta cuando implementes Stripe)
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// module.exports = stripe;

module.exports = {
  // Configuración de Stripe
  // secretKey: process.env.STRIPE_SECRET_KEY,
  // publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  // webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
};

