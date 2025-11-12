/**
 * Archivo principal de JavaScript
 * Aquí se inicializa la aplicación y se cargan los módulos necesarios
 */

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('Aplicación iniciada');
  
  // Inicializar componentes
  initComponents();
  
  // Inicializar utilidades
  initUtils();
});

/**
 * Inicializa los componentes de la aplicación
 */
function initComponents() {
  // Inicializar navegación
  initNavigation();
  // Inicializar footer
  initFooter();
}

/**
 * Inicializa las utilidades
 */
function initUtils() {
  // Aquí cargarás tus utilidades
  // Ejemplo: initApiClient();
}

// Exportar funciones principales si usas módulos ES6
// export { initComponents, initUtils };

