import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/projects-inside.css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "../styles/projects-carousel.css";
import CustomSlide from "./CustomSlide";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  const navigate = useNavigate();
  const timeline = gsap.timeline();

  function handleOrientationChange() {
    window.location.reload();
  }
  // Escuchar el evento de cambio de orientación
  window.addEventListener("orientationchange", handleOrientationChange);

  useGSAP(() => {
    timeline.to(".projects-gallery1", {
      scrollTrigger: {
        trigger: ".projects-gallery1",
        pin: ".projects-gallery1",
        start: "top",
        end: () => {
          const isMobile = window.innerWidth <= 768;
          return isMobile ? "50% top" : "50% top";
        },
        //markers: true,
        pinSpacing: true,
        scrub: true,
        overwrite: "auto",
        onComplete: () => {
          // Refrescar todos los ScrollTrigger al finalizar la animación
          ScrollTrigger.refresh();
        }
      }
    });

    timeline.to("#projects", {
      ease: "elastic.out(1,0.3)",
      scrollTrigger: {
        trigger: "#projects",
        start: "-50% top",
        pinSpacing: true,
        end: "top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(".about-section", {
            opacity: 1 - progress * 0.65,
            overwrite: "auto",
            ease: "elastic.out(1,0.3)"
          });
          gsap.to(".about-section", {
            y: `${progress * 200}px`,
            overwrite: "auto"
          });

          gsap.to("#projects", {
            borderTopLeftRadius: `${3.125 - 3.125 * progress}vw`,
            borderTopRightRadius: `${3.125 - 3.125 * progress}vw`,
            overwrite: "auto"
          });
        },
        onComplete: () => {
          // Refrescar todos los ScrollTrigger al finalizar la animación
          ScrollTrigger.refresh();
        }
      }
    });
  });

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const slides = [
    {
      id: "Villa_Victor",
      title: "Villa Victor",
      image: "/assets/images/Villa_Victor/1.jpg",
      price: "$5 M"
    },
    {
      id: "Villa_Guajira",
      title: "Villa Guajira",
      image: "/assets/images/Villa_Guajira/6.jpg",
      price: "$2.8 M"
    },
    {
      id: "Villa_Cartagena",
      title: "Villa Cartagena",
      image: "/assets/images/Villa_Cartagena/1.jpg",
      price: "$2.8 M"
    },
    {
      id: "Villa_Santa_Marta",
      title: "Villa Santa Marta",
      image: "/assets/images/Villa_Santa_Marta/2.jpg",
      price: "$2.8 M"
    },
    {
      id: "Villa_Barranquilla",
      title: "Villa Barranquilla",
      image: "/assets/images/Villa_Barranquilla/3.jpg",
      price: "$2.8 M"
    },
    {
      id: "Villa_Sunset",
      title: "Villa Sunset",
      image: "/assets/images/Villa_Sunset/1.jpg",
      price: "$2.6 M"
    },
    {
      id: "Villa_JH",
      title: "Villa JH",
      image: "/assets/images/Villa_JH/3.jpg",
      price: "$2.2 M"
    },
    {
      id: "Villa_Oasis",
      title: "Villa Oasis",
      image: "/assets/images/Villa_Oasis/2.jpg",
      price: "$3.99 M"
    },
    {
      id: "Villa_Nukes",
      title: "Villa Nukes",
      image: "/assets/images/Villa_Nukes/7.jpg",
      price: "$675 K"
    },
    {
      id: "Villa_Maria",
      title: "Villa Maria",
      image: "/assets/images/Villa_Maria/1.jpg",
      price: "$675 K"
    },
    {
      id: "Villa_Ciego_de_Avila",
      title: "Villa Ciego de Avila",
      image: "/assets/images/Villa_Ciego_de_Avila/5.jpg",
      price: "$675 K"
    },
    {
      id: "Villa_Don_Quixote",
      title: "Villa Don Quixote",
      image: "/assets/images/Villa_Don_Quixote/1.jpg",
      price: "$2 M"
    },
    {
      id: "Villa_Nelson",
      title: "Villa Nelson",
      image: "/assets/images/Villa_Nelson/2.jpg",
      price: "$2 M"
    },
    {
      id: "Villa_Dorticos",
      title: "Villa Dorticos",
      image: "/assets/images/Villa_Dorticos/6.jpg",
      price: "$2 M"
    },
    {
      id: "Villa_Esplanade",
      title: "Villa Esplanade",
      image: "/assets/images/Villa_Esplanade/7.jpg",
      price: "$675 K"
    },
    {
      id: "Villa_Atlantico",
      title: "Villa Atlantico",
      image: "/assets/images/Villa_Atlantico/1.jpg",
      price: "$2 M"
    },
    {
      id: "Villa_Anzola",
      title: "Villa Anzola",
      image: "/assets/images/Villa_Anzola/6.jpg",
      price: "$650 K"
    },
    {
      id: "Villa_Gabriel",
      title: "Villa Gabriel",
      image: "/assets/images/Villa_Gabriel/1.jpg",
      price: "$3.6 M"
    }
  ];

  return (
    <section
      id="projects"
      className="projects-gallery1 gallery-projects relative"
    >
      <h2 className="title-gallery">Projects</h2>
      <div className="swiper-container">
        <Swiper
          modules={[Pagination, EffectCoverflow, Navigation]}
          navigation={{
            nextEl: ".swiper-next-button",
            prevEl: ".swiper-prev-button"
          }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: -12,
            depth: 100,
            modifier: 2,
            slideShadows: false,
            scale: 0.95
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          slidesPerView={"auto"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
        >
          {slides.map((slide) => (
            <SwiperSlide className="swiper-slide">
              <CustomSlide
                onClick={() => handleProjectClick(slide.id)}
                className="swiper-slide"
                title={slide.title}
                price={slide.price}
                image={slide.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Add Pagination */}
        <div className="flechas">
          <div className="swiper-prev-button">
            <svg
              data-name="Capa 2"
              xmlns="http://www.w3.org/2000/svg"
              width="2.2vw"
              viewBox="0 0 51.26 51.26"
            >
              <g id="Capa_1-2" data-name="Capa 1">
                <g>
                  <polyline
                    points="42.51 25.28 11.35 25.28 22.24 14.39 11.35 25.28 22.24 36.18"
                    style={{
                      fill: "none",
                      stroke: "#162d57",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2
                    }}
                  />
                  <circle
                    cx="25.63"
                    cy="25.63"
                    r="24.63"
                    style={{
                      fill: "none",
                      stroke: "#162d57",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2
                    }}
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="swiper-pagination" />
          <div className="swiper-next-button">
            <svg
              data-name="Capa 2"
              xmlns="http://www.w3.org/2000/svg"
              width="2.2vw"
              viewBox="0 0 51.26 51.26"
            >
              <defs>
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "\n                    .cls-1 {\n                      fill: none;\n                      stroke: #162d57;\n                      stroke-linecap: round;\n                      stroke-linejoin: round;\n                      stroke-width: 2px;\n                    }\n                  "
                  }}
                />
              </defs>
              <g id="Capa_1-2" data-name="Capa 1">
                <g>
                  <polyline
                    className="cls-1"
                    points="8.74 25.28 39.91 25.28 29.01 14.39 39.91 25.28 29.01 36.18"
                  />
                  <circle className="cls-1" cx="25.63" cy="25.63" r="24.63" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
