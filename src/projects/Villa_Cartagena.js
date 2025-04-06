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

const mapaWidthPx = 498;
const mapaHeightPx = 519;
const villa = "Villa_Cartagena";

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
    { id: 10, x: 55, y: 198.5, a: 0, x_shadow: 27.5, y_shadow: 115.1 },
    { id: 11, x: 14.5, y: 182.6, a: 35, x_shadow: 27.5, y_shadow: 115.1 },
    { id: 12, x: 87.01, y: 183.5, a: 0, x_shadow: 66.36, y_shadow: 115.98 },
    { id: 13, x: 49.04, y: 163.23, a: 90, x_shadow: 87.19, y_shadow: 116.5 },
    { id: 14, x: 50.12, y: 241.32, a: 40, x_shadow: 75, y_shadow: 115.1 },
    { id: 15, x: 44.26, y: 124.36, a: 180, x_shadow: 28.1, y_shadow: 161.59 },
    { id: 16, x: 76.8, y: 140.2, a: 215, x_shadow: 28.9, y_shadow: 184.6 },
    { id: 17, x: 348.9, y: 208.43, a: 0, x_shadow: 314.36, y_shadow: 125.4 },
    { id: 18, x: 353.25, y: 201.7, a: -20, x_shadow: 314.5, y_shadow: 125.4 },
    { id: 23, x: 305.9, y: 258.46, a: 0, x_shadow: 286.64, y_shadow: 213.05 },
    { id: 24, x: 49.31, y: 299.08, a: 135, x_shadow: 86.37, y_shadow: 331.88 },
    { id: 21, x: 367.41, y: 81.86, a: 135, x_shadow: 409.81, y_shadow: 109.09 },
    { id: 22, x: 373.19, y: 84.88, a: 110, x_shadow: 416.28, y_shadow: 98.87 },
    { id: 19, x: 443.18, y: 132.41, a: -75, x_shadow: 395.14, y_shadow: 98.39 },
    { id: 20, x: 405.03, y: 140.5, a: 0, x_shadow: 395.1, y_shadow: 98.4 },

];

function handleOrientationChange() {
    window.location.reload();
}
// Escuchar el evento de cambio de orientación
window.addEventListener('orientationchange', handleOrientationChange);