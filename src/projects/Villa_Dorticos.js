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

const tl = gsap.timeline();

const mapaWidthPx = 410.18;
const mapaHeightPx = 385.05;
const villa = "Villa_Dorticos";

const mapaContainer = document.querySelector('.mapa');
mapaContainer.style.width = `${mapaWidthPx}px`;
mapaContainer.style.height = `${mapaHeightPx}px`;


swiper.on('slideChange', function () {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const index = swiper.activeIndex + 1;

    const texto = document.querySelector('.flex-item');
    const texto_height = texto.offsetHeight;

    let anchoDeseado = mapaWidthPx;
    let largoDeseado = viewportHeight * 0.40;
    if (viewportWidth < 767 && viewportWidth > 479) {
        largoDeseado = viewportHeight * 0.30;
    }
    let anchoDeseado_pc = viewportWidth * 0.3;
    let largoDeseado_pc = viewportHeight * 0.4;

    const cordExist = coordenadas.find(coord => coord.id === index);

    if (viewportWidth < 767) {
        anchoDeseado = viewportWidth * 0.9;
    }
    const escalaDeseada_ancho = anchoDeseado / mapaWidthPx;
    const escalaDeseada_largo = largoDeseado / mapaHeightPx;
    let crecimiento_px = (Math.min(escalaDeseada_ancho, escalaDeseada_largo) * mapaHeightPx) - mapaHeightPx;
    const desplazamiento_texto = crecimiento_px + mapaHeightPx;
    const margen_desplazamiento_px = 20;

    if (cordExist) {

        if (viewportWidth < 767) {
            gsap.to(".mapa", { y: `${crecimiento_px / 2}px`, scale: Math.min(escalaDeseada_ancho, escalaDeseada_largo), opacity: 1, duration: .5 });
            gsap.to(".flex-item", { y: `${desplazamiento_texto + margen_desplazamiento_px}px`, duration: .5 });
            document.querySelector('.project-container').style.height = `${viewportHeight + desplazamiento_texto + margen_desplazamiento_px + viewportHeight * 0.08}px`;
        }
        else {
            const escalaDeseada_ancho_pc = anchoDeseado_pc / mapaWidthPx;
            const escalaDeseada_largo_pc = largoDeseado_pc / mapaHeightPx;
            const crecimiento_px_largo = (Math.min(escalaDeseada_ancho_pc, escalaDeseada_largo_pc) * mapaHeightPx) - mapaHeightPx;
            const crecimiento_px_ancho = (Math.min(escalaDeseada_ancho_pc, escalaDeseada_largo_pc) * mapaWidthPx) - mapaWidthPx;

            gsap.to(".mapa", { y: `${- crecimiento_px_largo / 2}px`, x: `${- crecimiento_px_ancho / 2}px`, scale: Math.min(escalaDeseada_ancho_pc, escalaDeseada_largo_pc), opacity: 1, duration: .5 });

        }

        const cord = coordenadas.find(coord => coord.id === index);

        const shadowImg = document.querySelector('.shadow');

        if (shadowImg) {
            shadowImg.src = `/assets/mapas/${villa}/${index}.png`;
        }

        // Agregar animaciones a la línea de tiempo usando unidades relativas

        gsap.to(".camera", {
            opacity: 1,
            duration: 0,

        })
        tl.to(".shadow", {
            opacity: 0,
            duration: 0,
            ease: "power2.out",
        })
            .to(".shadow", {
                x: cord.x_shadow,
                y: cord.y_shadow,
                duration: 0,
                ease: "power2.out"
            })
            .to(".camera", {
                x: cord.x,
                y: cord.y,
                rotate: cord.a,
                duration: 0.35,
                ease: "power2.out"
            })
            .to(".shadow", {
                opacity: 1,
                duration: 0.25,
                ease: "power2.out"
            });



    } else {
        gsap.to(".mapa", { scale: 0, opacity: 0, duration: .5 });
        if (window.innerWidth < 767) {
            document.querySelector('.project-container').style.height = '100vh';
            gsap.to(".flex-item", { y: `0px`, duration: 0.5 });

        }
    }
}
);


const coordenadas = [
    { id: 7, x: 167.82, y: 174.11, a: 119, x_shadow: 209.28, y_shadow: 177.66 },
    { id: 8, x: 200.63, y: 208.20, a: -58, x_shadow: 111.83, y_shadow: 129.26 },
    { id: 9, x: 192.8, y: 246.6, a: -33, x_shadow: 111.97, y_shadow: 97.09 },
    { id: 10, x: 142.24, y: 179.48, a: -20, x_shadow: 111.95, y_shadow: 95.69 },
    { id: 11, x: 89.84, y: 106.33, a: -33, x_shadow: 39.36, y_shadow: 56.06 },
    { id: 12, x: 57.02, y: 103.07, a: 0, x_shadow: 39.66, y_shadow: 56.27 },
    { id: 13, x: 84.05, y: 63.63, a: -90, x_shadow: 38.82, y_shadow: 59.98 },
    { id: 14, x: 9.16, y: 135.9, a: 90, x_shadow: 47.70, y_shadow: 132.02 },
    { id: 15, x: 47.09, y: 108.27, a: -120, x_shadow: 22.97, y_shadow: 134.9 },
    { id: 16, x: 83.16, y: 175.31, a: -90, x_shadow: 23.43, y_shadow: 191.85 },
    { id: 17, x: 308.62, y: 174.07, a: 150, x_shadow: 321.67, y_shadow: 210.97 },
    { id: 18, x: 298.36, y: 188.9, a: 120, x_shadow: 341.33, y_shadow: 211.69 },

];

function handleOrientationChange() {
    window.location.reload();
}
// Escuchar el evento de cambio de orientación
window.addEventListener('orientationchange', handleOrientationChange);