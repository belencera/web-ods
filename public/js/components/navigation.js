/**
 * Componente de Navegación
 * Genera el menú de navegación fijo 
 */

function initNavigation() {
  // Determinar la ruta base según la ubicación del archivo
  const isInPages = window.location.pathname.includes('/pages/');
  const basePath = isInPages ? '../' : './';
  
  const navigation = `
    <header id="main-navbar">
      <div class="header-menu">
        <div class="header-logo">
          <a href="${basePath}index.html">
            <img src="${basePath}assets/images/logo-noletters-white.png" alt="Logo" onerror="this.style.display='none';">
          </a>
        </div>
        <nav>
          <ul>
            <li><a href="${basePath}index.html" class="nav-link">Inicio</a></li>
            <li><a href="${basePath}pages/servicios.html" class="nav-link">Servicios</a></li>
            <li><a href="${basePath}pages/planes.html" class="nav-link">Planes</a></li>
            <li><a href="${basePath}pages/nosotros.html" class="nav-link">Nosotros</a></li>
            <li><a href="${basePath}pages/contacto.html" class="nav-link">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;
  
  // Insertar el menú al inicio del body
  document.body.insertAdjacentHTML('afterbegin', navigation);
  
  // Marcar el enlace activo según la página actual
  markActiveLink();
}

/**
 * Marca el enlace activo según la página actual
 */
function markActiveLink() {
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('#main-navbar nav .nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const linkPath = new URL(href, window.location.origin).pathname;
    
    // Comparar rutas
    if (currentPage.endsWith(linkPath) || 
        (currentPage.endsWith('/') && linkPath.includes('index.html')) ||
        (currentPage.endsWith('index.html') && linkPath.includes('index.html'))) {
      link.classList.add('active');
    }
  });
}

