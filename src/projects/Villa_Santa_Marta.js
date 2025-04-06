
const coordenadas = [
    { id: 6, floor: 1, x: 106.15, y: 192.7, a: 90, x_shadow: 145, y_shadow: 164.3 },
    { id: 7, floor: 1, x: 106.6, y: 112.8, a: 145, x_shadow: 127.32, y_shadow: 142.7 },
    { id: 8, floor: 1, x: 183.45, y: 150.3, a: 232, x_shadow: 92.6, y_shadow: 189.04 },
    { id: 9, floor: 1, x: 176.3, y: 105.18, a: -90, x_shadow: 59.9, y_shadow: 100.9 },
    { id: 10, floor: 1, x: 170.2, y: 191.6, a: -27, x_shadow: 70.2, y_shadow: 101.7 },
    { id: 11, floor: 1, x: 52.12, y: 114.7, a: 90, x_shadow: 89.4, y_shadow: 101.76 },
    { id: 12, floor: 2, x: 113.08, y: 147.1, a: 90, x_shadow: 152.36, y_shadow: 137.4 },
    { id: 13, floor: 2, x: 182.6, y: 171.04, a: -45, x_shadow: 143.7, y_shadow: 137.4 },
    { id: 14, floor: 2, x: 122.11, y: 202.12, a: 90, x_shadow: 164.37, y_shadow: 202.94 },
    { id: 15, floor: 2, x: 110.57, y: 294.15, a: 142, x_shadow: 134.88, y_shadow: 326.63 },
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

const mapaWidth_floor_1 = 245.2;
const mapaHeight_floor_1 = 523.5;
const mapaWidth_floor_2 = 243;
const mapaHeight_floor_2 = 524;

const villa = "Villa_Santa_Marta";

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