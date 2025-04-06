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
    touchEventsTarget: 'main',
    speed: 600

});

const tl = gsap.timeline();

const mapaWidthPx = 466;
const mapaHeightPx = 419.4;
const villa = "Villa_Atlantico";

const mapaContainer = document.querySelector('.mapa');
mapaContainer.style.width = `${mapaWidthPx}px`;
mapaContainer.style.height = `${mapaHeightPx}px`;



swiper.on('slideChange', function () {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    if (viewportWidth < 479) {
        mapaContainer.style.left = "2rem";
    }
    const index = swiper.activeIndex + 1;

    const texto = document.querySelector('.flex-item');
    const texto_height = texto.offsetHeight;

    let anchoDeseado = mapaWidthPx;
    let largoDeseado = viewportHeight * 0.48;
    if (viewportWidth < 767 && viewportWidth > 479) {
        largoDeseado = viewportHeight * 0.38;
    }
    let anchoDeseado_pc = viewportWidth * 0.35;
    let largoDeseado_pc = viewportHeight * 0.45;

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
    { id: 4, x: 133, y: 269, a: 0, x_shadow: 137.6, y_shadow: 229.5 },
    { id: 5, x: 171, y: 192, a: 230, x_shadow: 138.7, y_shadow: 229.5 },
    { id: 6, x: 176, y: 267, a: -36, x_shadow: 138.7, y_shadow: 229.5 },
    { id: 7, x: 172.4, y: 190.5, a: 0, x_shadow: 165.9, y_shadow: 161.7 },
    { id: 8, x: 195, y: 230, a: -30, x_shadow: 165.2, y_shadow: 160 },
    { id: 9, x: 175.4, y: 221.2, a: 0, x_shadow: 166.1, y_shadow: 162.5 },
    { id: 10, x: 129.5, y: 266.3, a: -90, x_shadow: 104.9, y_shadow: 276.8 },
    { id: 11, x: 123, y: 237, a: 225, x_shadow: 103.2, y_shadow: 275.6 },
    { id: 12, x: 148.6, y: 277, a: -90, x_shadow: 139.5, y_shadow: 288.17 },
    { id: 13, x: 100.19, y: 291.9, a: 90, x_shadow: 140.95, y_shadow: 288.17 },
];

const imagenesPrecargar = [

];
for (let i = 0; i < swiper.slides.length; i++) {
    if (coordenadas.some(coord => coord.id === i + 1)) {
        imagenesPrecargar.push(`/assets/mapas/${villa}/${i + 1}.png`);
        console.log(`/assets/mapas/${villa}/${i + 1}.png`);
    }
}
// Precarga todas las imágenes
function precargarImagenes() {
    imagenesPrecargar.forEach(url => {
        const img = new Image(); // Crea un objeto Image
        img.src = url; // Esto fuerza al navegador a cargarla
    });
}
window.addEventListener('load', precargarImagenes);

function handleOrientationChange() {
    window.location.reload();
}
// Escuchar el evento de cambio de orientación
window.addEventListener('orientationchange', handleOrientationChange);

function handleOrientationChange() {
    window.location.reload();
}
// Escuchar el evento de cambio de orientación
window.addEventListener('orientationchange', handleOrientationChange);