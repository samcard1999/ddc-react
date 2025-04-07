import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../styles/projects-inside.css";
import { gsap } from "gsap";
import Map from "./Map";
import { Keyboard, Mousewheel } from "swiper/modules";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./floorCounterSlice";
import { oneFloor, twoFloor } from "./floorQuantitySlice";
import { updateDimensions } from "./mapDimensionsSlice";
import { useEffect } from "react";

const Carousel = ({
  title_villa,
  images_folder,
  total_images,
  coordenadas,
  mapaWidthPx,
  mapaHeightPx,
  floor_2_mapaWidthPx,
  floor_2_mapaHeightPx
}) => {
  const floorCounter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const totalImages = total_images;
  const tl = gsap.timeline();

  const villa = images_folder;

  useEffect(() => {
    dispatch(updateDimensions({ width: mapaWidthPx, height: mapaHeightPx }));
  }, []);

  return (
    <>
      <Map mapa_title={images_folder} />

      <Swiper
        containerModifierClass="swiper-container-1" // Clase modificadora única
        className="swiper-container-1"
        modules={[Pagination, EffectFade, Keyboard, Mousewheel]}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        pagination={{
          el: ".swiper-pagination-inside",
          clickable: true,
          dynamicBullets: true
        }}
        slidesPerView={1}
        cursor={"pointer"}
        mousewheel={{ invert: false }}
        keyboard={true}
        speed={550}
        observeSlideChildren={true}
        onSlideChange={(swiper) => {
          if (coordenadas) {
            const index = swiper.activeIndex + 1;
            const cord = coordenadas.find((coord) => coord.id === index);
            dispatch(oneFloor());
            if (cord && cord.floor) {
              dispatch(twoFloor());
              if (cord.floor === 1 && floorCounter === 2) {
                dispatch(decrement());
                dispatch(
                  updateDimensions({ width: mapaWidthPx, height: mapaHeightPx })
                );
              } else if (cord.floor === 2 && floorCounter === 1) {
                dispatch(increment());

                dispatch(
                  updateDimensions({
                    width: floor_2_mapaWidthPx,
                    height: floor_2_mapaHeightPx
                  })
                );
              }
            }

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let anchoDeseado = mapaWidthPx;
            let largoDeseado = viewportHeight * 0.4;
            if (viewportWidth < 767 && viewportWidth > 479) {
              largoDeseado = viewportHeight * 0.3;
            }
            let anchoDeseado_pc = viewportWidth * 0.3;
            let largoDeseado_pc = viewportHeight * 0.4;

            const cordExist = coordenadas.find((coord) => coord.id === index);

            if (viewportWidth < 767) {
              anchoDeseado = viewportWidth * 0.9;
            }
            const escalaDeseada_ancho = anchoDeseado / mapaWidthPx;
            const escalaDeseada_largo = largoDeseado / mapaHeightPx;
            let crecimiento_px =
              Math.min(escalaDeseada_ancho, escalaDeseada_largo) *
                mapaHeightPx -
              mapaHeightPx;
            const desplazamiento_texto = crecimiento_px + mapaHeightPx;
            const margen_desplazamiento_px = 37;

            if (cordExist) {
              if (viewportWidth < 767) {
                gsap.to(".mapa", {
                  y: `${crecimiento_px / 2}px`,
                  scale: Math.min(escalaDeseada_ancho, escalaDeseada_largo),
                  opacity: 1,
                  duration: 0.5
                });
                gsap.to(".flex-item", {
                  y: `${desplazamiento_texto + margen_desplazamiento_px}px`,
                  duration: 0.5
                });
                document.querySelector(".project-container").style.height = `${
                  viewportHeight +
                  desplazamiento_texto +
                  margen_desplazamiento_px +
                  viewportHeight * 0.08
                }px`;
              } else {
                const escalaDeseada_ancho_pc = anchoDeseado_pc / mapaWidthPx;
                const escalaDeseada_largo_pc = largoDeseado_pc / mapaHeightPx;
                const crecimiento_px_largo =
                  Math.min(escalaDeseada_ancho_pc, escalaDeseada_largo_pc) *
                    mapaHeightPx -
                  mapaHeightPx;
                const crecimiento_px_ancho =
                  Math.min(escalaDeseada_ancho_pc, escalaDeseada_largo_pc) *
                    mapaWidthPx -
                  mapaWidthPx;

                gsap.to(".mapa", {
                  y: `${-crecimiento_px_largo / 2}px`,
                  x: `${-crecimiento_px_ancho / 2}px`,
                  scale: Math.min(
                    escalaDeseada_ancho_pc,
                    escalaDeseada_largo_pc
                  ),
                  opacity: 1,
                  duration: 0.5
                });
              }

              const shadowImg = document.querySelector(".shadow");

              if (shadowImg) {
                shadowImg.src = `/assets/images/mapas/${villa}/${index}.png`;
              }

              // Agregar animaciones a la línea de tiempo usando unidades relativas

              gsap.to(".camera", {
                opacity: 1,
                duration: 0
              });
              tl.to(".shadow", {
                opacity: 0,
                duration: 0,
                ease: "power2.out"
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
              gsap.to(".mapa", { scale: 0, opacity: 0, duration: 0.5 });
              if (window.innerWidth < 767) {
                document.querySelector(".project-container").style.height =
                  "100vh";
                gsap.to(".flex-item", { y: `0px`, duration: 0.5 });
              }
            }
          }
        }}
      >
        {[...Array(totalImages)].map((_, index) => (
          <SwiperSlide className="swiper-slide">
            <img
              loading="lazy"
              src={`/assets/images/${images_folder}/${index + 1}.jpeg`}
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
        <div className="swiper-pagination-inside"></div>
      </Swiper>
    </>
  );
};

export default Carousel;
