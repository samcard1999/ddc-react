gsap.registerPlugin(ScrollTrigger);

// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    cursor: 'pointer',
    mousewheel: {
        invert: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    effect: 'fade', // Cambia el efecto de transición a 'fade'
    fadeEffect: {
        crossFade: true // Opcional: Habilita el cross-fade
    },
    speed: 400 // Ralentiza la duración del efecto de transición a 1000ms
});

swiper.on('slideChange', function () {

    const index = swiper.activeIndex + 1;


    if (swiper.activeIndex >= 4) {
        if (window.innerWidth < 767) {

            gsap.to(".flex-item", { top: "85vh", duration: .5 });
            document.querySelector('.project-container').style.height = '125vh';
        }

        gsap.to(".mapa", { scale: 1, opacity: 1, duration: .5 });
        const cord = coordenadas.find(coord => coord.id === index);

        const shadowImg = document.querySelector('.shadow');
        const shadowContainer = document.querySelector('.shadow-container');


        const mapaContainer = document.querySelector('.mapa');
        const mapaRect = mapaContainer.getBoundingClientRect();
        const mapaWidthPx = mapaRect.width;
        const mapaHeightPx = mapaRect.height;
        const mapaWidth = 466;
        const mapaHeight = 419.4;
        const factor_x = mapaWidthPx / mapaWidth;
        const factor_y = mapaHeightPx / mapaHeight;

        if (shadowImg) {
            shadowImg.src = `/assets/mapas/${index}.png`;
            const shadowWidth = shadowContainer.getBoundingClientRect().width;
            const shadowHeight = shadowContainer.getBoundingClientRect().height;
            shadowImg.style.width = `${shadowWidth * factor_x}px`;
            shadowImg.style.height = `${shadowHeight * factor_y}px`;

            console.log(shadowWidth);
            console.log(shadowHeight);
        }

        gsap.to(".shadow", {
            opacity: 0,
            duration: 0,
            ease: "power2.out"
        });

        gsap.to(".shadow", {
            x: `${cord.x_shadow / mapaWidth * mapaWidthPx}`,
            y: `${cord.y_shadow / mapaHeight * mapaHeightPx}`,
            duration: 1,
            ease: "power2.out"
        });
        // Crear una línea de tiempo
        const tl = gsap.timeline();

        // Agregar animaciones a la línea de tiempo usando unidades relativas
        tl.to(".camera", {
            x: `${cord.x / mapaWidth * mapaWidthPx}`,
            y: `${cord.y / mapaHeight * mapaHeightPx}`,
            rotate: cord.a,
            duration: 1,
            ease: "power2.out"
        })
            .to(".shadow", {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            });



    } else {
        gsap.to(".mapa", { scale: 0, opacity: 0, duration: .5 });
        if (window.innerWidth < 767) {
            document.querySelector('.project-container').style.height = '100vh';
            gsap.to(".flex-item", { top: "40vh", duration: .5 });
        }
    }
}
);


const coordenadas = [
    { id: 5, x: 133, y: 269, a: 0, x_shadow: 137.6, y_shadow: 229.5 },
    { id: 6, x: 171, y: 192, a: 230, x_shadow: 138.7, y_shadow: 229.5 },
    { id: 7, x: 195, y: 230, a: -30, x_shadow: 165.2, y_shadow: 160 },
    { id: 8, x: 176, y: 267, a: -36, x_shadow: 138.7, y_shadow: 229.5 },
    { id: 9, x: 123, y: 237, a: 225, x_shadow: 103.2, y_shadow: 275.6 },

];

