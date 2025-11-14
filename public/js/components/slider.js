/**
 * SLIDER.JS
 * Inicializa el carrusel de servicios (movimiento infinito)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el contenedor que se moverá
    const sliderTrack = document.getElementById('service-carousel-track');
    
    // Si el elemento no existe en la página, salir.
    if (!sliderTrack) return;

    // --- 1. Clonación y Duplicación de Tarjetas ---
    
    const cards = Array.from(sliderTrack.children);
    
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        sliderTrack.appendChild(clone);
    });

    // --- 2. Cálculo del Ancho y Duración ---
    
    // Dimensiones definidas en el CSS 
    const cardWidth = 250;   
    const cardMarginRight = 15; 
    const cardTotalSize = cardWidth + cardMarginRight;
    
    const totalCards = sliderTrack.children.length;
    
    const totalWidth = totalCards * cardTotalSize;

    sliderTrack.style.width = `${totalWidth}px`;
    
    // --- 3. Aplicación de la Animación CSS y Control de Velocidad ---
    
    const speedFactor = 5.0; 
    
    // Calculamos la duración total
    const originalCardsCount = totalCards / 2; 
    const animationDuration = originalCardsCount * speedFactor; 
    
    // Aplicar la duración y la animación
    sliderTrack.style.animationDuration = `${animationDuration}s`;
    sliderTrack.style.animationName = 'scroll-loop';
    sliderTrack.style.animationTimingFunction = 'linear'; 
    sliderTrack.style.animationIterationCount = 'infinite';
    sliderTrack.style.animationPlayState = 'running';
    
    // Pausar la animación al pasar el ratón sobre el track
    sliderTrack.addEventListener('mouseenter', () => {
        sliderTrack.style.animationPlayState = 'paused';
    });
    sliderTrack.addEventListener('mouseleave', () => {
        sliderTrack.style.animationPlayState = 'running';
    });
});