/**
 * Cliente API
 * Utilidades para hacer peticiones al backend
 */

const API_BASE_URL = '/api'; // Ajusta según tu configuración

/**
 * Realiza una petición GET
 */
async function get(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en GET:', error);
    throw error;
  }
}

/**
 * Realiza una petición POST
 */
async function post(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en POST:', error);
    throw error;
  }
}

// Exportar funciones
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { get, post };
}

