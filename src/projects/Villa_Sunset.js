gsap.registerPlugin(ScrollTrigger);

// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    lazy: {
        loadPrevNext: true,
    },
    slidesPerView: 1,
    cursor: 'pointer',
    mousewheel: {
        invert: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    effect: 'fade', // Cambia el efecto de transición a 'fade'
    fadeEffect: {
        crossFade: true // Opcional: Habilita el cross-fade
    },
    speed: 600

});


function handleOrientationChange() {
    window.location.reload();
}
// Escuchar el evento de cambio de orientación
window.addEventListener('orientationchange', handleOrientationChange);