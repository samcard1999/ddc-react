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
    speed: 550

});

const tl = gsap.timeline();

const mapaWidthPx = 429.3;
const mapaHeightPx = 438;
const villa = "Villa_Barranquilla";

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
    { id: 19, x: 318.3, y: 224, a: 50, x_shadow: 346, y_shadow: 190.3 },
    { id: 20, x: 344.6, y: 160.9, a: 180, x_shadow: 342.6, y_shadow: 202.3 },
    { id: 21, x: 354.6, y: 231.9, a: 0, x_shadow: 342.7, y_shadow: 190.3 },
    { id: 11, x: 112.6, y: 206, a: 0, x_shadow: 92, y_shadow: 82 },
    { id: 13, x: 110.6, y: 68, a: 180, x_shadow: 91, y_shadow: 109 },
    { id: 14, x: 51.7, y: 149.7, a: 90, x_shadow: 93.9, y_shadow: 137.3 },
    { id: 10, x: 161.7, y: 124.7, a: 270, x_shadow: 92.3, y_shadow: 111.7 },
    { id: 12, x: 152.6, y: 41.1, a: 215, x_shadow: 93.6, y_shadow: 82.8 },
    { id: 15, x: 302.6, y: 135.6, a: 90, x_shadow: 342.7, y_shadow: 117.1 },
    { id: 16, x: 389, y: 131.6, a: 280, x_shadow: 342.9, y_shadow: 118.8 },
    { id: 18, x: 329.5, y: 126.6, a: -20, x_shadow: 311.8, y_shadow: 84.7 },
    { id: 17, x: 272.6, y: 121, a: 5, x_shadow: 273.4, y_shadow: 84.1 },

];

function handleOrientationChange() {
    window.location.reload();
}
// Escuchar el evento de cambio de orientación
window.addEventListener('orientationchange', handleOrientationChange);