const coordenadas = [
    { id: 10, floor: 1, x: 251.5, y: 162.5, a: 0, x_shadow: 230.3, y_shadow: 84.9 },
    { id: 12, floor: 1, x: 230.2, y: 77.6, a: 180, x_shadow: 215.6, y_shadow: 118.1 },
    { id: 13, floor: 1, x: 143.3, y: 127.07, a: 90, x_shadow: 182.6, y_shadow: 84.5 },
    { id: 14, floor: 1, x: 267.3, y: 110.3, a: -90, x_shadow: 169.3, y_shadow: 84.34 },
    { id: 15, floor: 1, x: -4, y: 103.28, a: 90, x_shadow: 31.05, y_shadow: 83.3 },
    { id: 11, floor: 1, x: 58.4, y: 102.2, a: -90, x_shadow: 3.26, y_shadow: 84.5 },
    { id: 21, floor: 2, x: 86.45, y: 200.87, a: 135, x_shadow: 124.5, y_shadow: 222.1 },
    { id: 16, floor: 2, x: 286.9, y: 79.78, a: 225, x_shadow: 243.24, y_shadow: 116.10 },
    { id: 17, floor: 1, x: 150.9, y: 187.3, a: 180, x_shadow: 161.3, y_shadow: 227.04 },
    { id: 18, floor: 1, x: 121.49, y: 240.5, a: 0, x_shadow: 119.28, y_shadow: 217.36 },
    { id: 19, floor: 2, x: 36.78, y: 134.37, a: -90, x_shadow: 19.47, y_shadow: 152.42 },
    { id: 20, floor: 2, x: -22.185, y: 147.5, a: 90, x_shadow: 17.63, y_shadow: 152.63 },
];


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

const mapaWidth_floor_1 = 314;
const mapaHeight_floor_1 = 539;
const mapaWidth_floor_2 = 323;
const mapaHeight_floor_2 = 533;

const villa = "Villa_Guajira";
const mapaContainer = document.querySelector('.mapa');
const mapImg = mapaContainer.querySelector('img:first-child');
mapaContainer.style.width = `${mapaWidth_floor_1}px`;
mapaContainer.style.height = `${mapaHeight_floor_1}px`;


swiper.on('slideChange', function () {
    const index = swiper.activeIndex + 1;
    const cord = coordenadas.find(coord => coord.id === index);

    if (cord) {
        if (cord.floor === 1) {
            mapImg.src = `/assets/mapas/${villa}/map_floor_1.png`;
            mapaContainer.style.width = `${mapaWidth_floor_1}px`;
            mapaContainer.style.height = `${mapaHeight_floor_1}px`;

        }
        else if (cord.floor === 2) {
            mapImg.src = `/assets/mapas/${villa}/map_floor_2.png`;
            mapaContainer.style.width = `${mapaWidth_floor_2}px`;
            mapaContainer.style.height = `${mapaHeight_floor_2}px`;

        }
    }

    const mapaWidthPx = mapaContainer.offsetWidth;
    const mapaHeightPx = mapaContainer.offsetHeight;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const texto = document.querySelector('.flex-item');
    const texto_height = texto.offsetHeight;

    let anchoDeseado = mapaWidthPx;
    let largoDeseado = viewportHeight * 0.40;
    if (viewportWidth < 767 && viewportWidth > 479) {
        largoDeseado = viewportHeight * 0.30;
    }
    let anchoDeseado_pc = viewportWidth * 0.3;
    let largoDeseado_pc = viewportHeight * 0.4;

    if (viewportWidth < 767) {
        anchoDeseado = viewportWidth * 0.9;
    }
    const escalaDeseada_ancho = anchoDeseado / mapaWidthPx;
    const escalaDeseada_largo = largoDeseado / mapaHeightPx;
    let crecimiento_px = (Math.min(escalaDeseada_ancho, escalaDeseada_largo) * mapaHeightPx) - mapaHeightPx;
    const desplazamiento_texto = crecimiento_px + mapaHeightPx;
    const margen_desplazamiento_px = 20;

    if (cord) {

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
function handleOrientationChange() {
    window.location.reload();
}
// Escuchar el evento de cambio de orientación
window.addEventListener('orientationchange', handleOrientationChange);