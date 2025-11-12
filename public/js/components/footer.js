/**
 * Componente de Footer
 * Genera el footer en todas las páginas
 */

function initFooter() {
  // Determinar la ruta base según la ubicación del archivo
  const isInPages = window.location.pathname.includes('/pages/');
  const basePath = isInPages ? '../' : './';
  
  const currentYear = new Date().getFullYear();
  
  const footer = `
    <footer id="main-footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section footer-logo-section">
            <a href="${basePath}index.html" class="footer-logo">
              <img src="${basePath}assets/images/logo-noletters-white.png" alt="Logo On Demand Solutions" onerror="this.style.display='none';">
            </a>
            <h3>On Demand Solutions</h3>
            <p>Soluciones web a medida para tu negocio</p>
          </div>
          
          <div class="footer-section">
            <h4>Enlaces</h4>
            <div class="footer-links-columns">
              <ul class="footer-links-col">
                <li><a href="${basePath}index.html">Inicio</a></li>
                <li><a href="${basePath}pages/servicios.html">Servicios</a></li>
                <li><a href="${basePath}pages/planes.html">Planes</a></li>
              </ul>
              <ul class="footer-links-col">
                <li><a href="${basePath}pages/nosotros.html">Nosotros</a></li>
                <li><a href="${basePath}pages/contacto.html">Contacto</a></li>
              </ul>
            </div>
          </div>
          
          <div class="footer-section">
            <h4>Contacto</h4>
            <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"/></svg>administracion@ondemand.com.ar</p>
            <p><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m20.487 17.14l-4.065-3.696a1 1 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66c-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a1 1 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39"/></svg>+34 641 099 875</p>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="footer-copyright">&copy; ${currentYear} On Demand Solutions. Todos los derechos reservados.</p>
          <div class="footer-legal">
            <a href="${basePath}pages/aviso-legal.html">Aviso Legal</a>
            <span>|</span>
            <a href="${basePath}pages/politica-cookies.html">Política de Cookies</a>
            <span>|</span>
            <a href="${basePath}pages/terminos-condiciones.html">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  `;
  
  // Insertar el footer al final del body
  document.body.insertAdjacentHTML('beforeend', footer);
}
