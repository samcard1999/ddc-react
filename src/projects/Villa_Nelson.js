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

const mapaWidthPx = 299;
const mapaHeightPx = 391;
const villa = "Villa_Nelson";

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
    { id: 12, x: 105.4, y: 177.37, a: -45, x_shadow: 45.05, y_shadow: 139.47 },
    { id: 7, x: 128.25, y: 208.47, a: 0, x_shadow: 50.80, y_shadow: 139.6 },
    { id: 8, x: 96.6, y: 106.34, a: 160, x_shadow: 106.97, y_shadow: 143.12 },
    { id: 10, x: 147.07, y: 183.34, a: 0, x_shadow: 152, y_shadow: 140.7 },
    { id: 11, x: 71.07, y: 166.34, a: 0, x_shadow: 72.78, y_shadow: 138.31 },
    { id: 13, x: 127.18, y: 135.52, a: -90, x_shadow: 43.9, y_shadow: 138.86 },
    { id: 14, x: 80.03, y: 101.36, a: 180, x_shadow: 57.84, y_shadow: 141.45 },
    { id: 9, x: 114, y: 104.3, a: 180, x_shadow: 68.6, y_shadow: 143.14 },
    { id: 17, x: 229.46, y: 80.56, a: -90, x_shadow: 211.38, y_shadow: 84.40 },
    { id: 18, x: 175, y: 86.99, a: 90, x_shadow: 214.5, y_shadow: 83.97 },
    { id: 15, x: 112, y: 87.9, a: 90, x_shadow: 152.15, y_shadow: 84.4 },
    { id: 16, x: 116.1, y: 118.9, a: 70, x_shadow: 152.87, y_shadow: 83.98 },
    { id: 19, x: 207.89, y: 212.43, a: 180, x_shadow: 212.24, y_shadow: 250.69 },
];

function handleOrientationChange() {
    window.location.reload();
}
// Escuchar el evento de cambio de orientación
window.addEventListener('orientationchange', handleOrientationChange);