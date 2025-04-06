const coordenadas = [
    { id: 11, floor: 1, x: 232.46, y: 30.42, a: 90, x_shadow: 269.68, y_shadow: 6 },
    { id: 12, floor: 1, x: 298.37, y: 40.28, a: -90, x_shadow: 29.46, y_shadow: 5.42 },
    { id: 13, floor: 1, x: 171.54, y: 73.34, a: 55, x_shadow: 205.61, y_shadow: 5.69 },
    { id: 14, floor: 1, x: 209.96, y: 52.97, a: -122, x_shadow: 27.84, y_shadow: 86 },
    { id: 15, floor: 1, x: 173.63, y: 167.59, a: -90, x_shadow: 115.88, y_shadow: 160.4 },
    { id: 16, floor: 2, x: 297.63, y: 44.2, a: 90, x_shadow: 338.79, y_shadow: 28.63 },
    { id: 17, floor: 2, x: 317.42, y: 26.63, a: 135, x_shadow: 360.2, y_shadow: 54.7 },
    { id: 20, floor: 2, x: 425.69, y: 89.58, a: 0, x_shadow: 412.04, y_shadow: 27.93 },
    { id: 18, floor: 2, x: 492.7, y: 27.75, a: -90, x_shadow: 467.5, y_shadow: 27.93 },
    { id: 19, floor: 2, x: 465.52, y: -5.45, a: 180, x_shadow: 465.94, y_shadow: 35.32 },
    { id: 21, floor: 2, x: 401.27, y: 59.75, a: 40, x_shadow: 429.02, y_shadow: 38.48 },
    { id: 22, floor: 2, x: 148.52, y: 46.54, a: 180, x_shadow: 136.08, y_shadow: 85.5 },
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

const mapaWidth_floor_1 = 535;
const mapaHeight_floor_1 = 340.4;
const mapaWidth_floor_2 = 549.7;
const mapaHeight_floor_2 = 345.2;

const villa = "Villa_Victor";
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