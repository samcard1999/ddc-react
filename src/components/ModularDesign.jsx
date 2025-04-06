import React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ModularDesign = () => {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  const timeline = gsap.timeline();

  useGSAP(() => {
    //borderTop
    timeline.to(".content", {
      ease: "elastic.out(1,0.3)",
      scrollTrigger: {
        trigger: ".content",
        start: "-50% top",
        pinSpacing: true,
        end: "top",
        scrub: true,
        //markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(".card-test-2", {
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

    //pin
    timeline.to(".choose-section", {
      scrollTrigger: {
        trigger: ".choose-section",
        start: "top ",
        end: "600% top",
        scrub: true,
        pin: true,
        pinSpacing: true,
        //markers: true,
        overwrite: "auto",
        onEnter: () =>
          gsap.to("#menuToggle span", {
            backgroundColor: "#dcdfe2",
            duration: 0.5
          }),
        onEnterBack: () =>
          gsap.to("#menuToggle span", {
            backgroundColor: "#dcdfe2",
            duration: 0.5
          }),

        onLeaveBack: () =>
          gsap.to("#menuToggle span", {
            backgroundColor: "#070f1d",
            duration: 0.5
          }),
        onComplete: () => {
          // Refrescar todos los ScrollTrigger al finalizar la animación
          ScrollTrigger.refresh();
        }
      }
    });

    //advantage 1
    timeline.to(".advantage-1", {
      scrollTrigger: {
        trigger: ".content",
        start: "top", // Inicia la animación cada 300px
        end: "140%", // Termina la animación después de 300px
        //markers: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const startFade = 0.2; // 10% del progreso
          const endFade = 0.8; // 90% del progreso
          let opacity;

          if (progress < startFade) {
            opacity = progress / startFade;
          } else if (progress > endFade) {
            opacity = (1 - progress) / (1 - endFade);
          } else {
            opacity = 1;
          }
          gsap.to(".advantage-1", { opacity: opacity, overwrite: "auto" });
        }
      }
    });

    //advantage 2
    timeline.to(".advantage-2", {
      scrollTrigger: {
        trigger: ".content",
        start: "160%", // Inicia la animación cada 300px
        end: "300%", // Termina la animación después de 300px
        //markers: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const startFade = 0.2; // 10% del progreso
          const endFade = 0.8; // 90% del progreso
          let opacity;

          if (progress < startFade) {
            opacity = progress / startFade;
          } else if (progress > endFade) {
            opacity = (1 - progress) / (1 - endFade);
          } else {
            opacity = 1;
          }
          gsap.to(".advantage-2", { opacity: opacity, overwrite: "auto" });
        }
      }
    });

    //advantage 3
    timeline.to(".advantage-3", {
      scrollTrigger: {
        trigger: ".content",
        start: "320%", // Inicia la animación cada 300px
        end: "460%", // Termina la animación después de 300px
        //markers: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const startFade = 0.2; // 10% del progreso
          const endFade = 0.8; // 90% del progreso
          let opacity;

          if (progress < startFade) {
            opacity = progress / startFade;
          } else if (progress > endFade) {
            opacity = (1 - progress) / (1 - endFade);
          } else {
            opacity = 1;
          }
          gsap.to(".advantage-3", { opacity: opacity, overwrite: "auto" });
        }
      }
    });

    //advantage 4
    timeline.to(".advantage-4", {
      scrollTrigger: {
        trigger: ".content",
        start: "480%", // Inicia la animación cada 300px
        end: "600%", // Termina la animación después de 300px
        //markers: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const startFade = 0.2; // 10% del progreso
          const endFade = 0.8; // 90% del progreso
          let opacity;

          if (progress < startFade) {
            opacity = progress / startFade;
          } else if (progress > endFade) {
            opacity = (1 - progress) / (1 - endFade);
          } else {
            opacity = 1;
          }
          gsap.to(".advantage-4", { opacity: opacity, overwrite: "auto" });
        }
      }
    });
  });

  return (
    <section
      id="choose"
      className="card-test-2 choose-section bg-main-choose-section relative"
    >
      <div className="content" id="door-block">
        <div className="sec-title-1">
          Why <br />
          Modular System?
        </div>
        <div className="sec-title-2">FEATURES</div>
        <div
          className="advantage-1 detail inline-block top-right text-right"
          id="detail-1"
        >
          <div className="advantage-title">
            <h1 className="text-21 wither mid-grey">
              <b>30% Cost Reduction</b>
            </h1>
            <div className="raya" />
            <h3 className="text-21 wither mid-grey mb-8">
              <b>Lower Costs, Greater Efficiency</b>
            </h3>
          </div>
          <p className="text-advantage text-21 wither mid-grey">
            Our modular system is more affordable than traditional construction
            methods due to optimized manufacturing, reduced waste, and shorter
            project cycles.
          </p>
          <div className="raya-1" style={{ marginTop: "-1rem" }} />
          <h3 className="advantage-cell-1 text-21 wither mid-grey mb-8">
            30% Cost Reduction
          </h3>
        </div>
        <div
          className="advantage-2 detail inline-block medium-top-left text-left"
          id="detail-2"
        >
          <div className="advantage-title">
            <h3 className="text-21 wither mid-grey mb-8">
              <b>Eco-Friendly Construction</b>
            </h3>
            <div className="raya" />
            <h1 className="text-21 wither mid-grey">
              <b>100% Recyclable</b>
            </h1>
          </div>
          <p className="text-advantage text-21 wither mid-grey">
            Our products are made from recycled materials and are fully
            reciclable at the end of their lifecycle, reducing environmental
            impact.
          </p>
          <div className="raya-2" />
          <h3 className="advantage-cell-2 text-21 wither mid-grey mb-8">
            100% Recyclable
          </h3>
        </div>
        <div
          className="advantage-3 detail inline-block medium-bottom-right text-right"
          id="detail-3"
        >
          <div className="advantage-title">
            <h1 className="text-21 wither mid-grey">
              <b>60-70% Faster</b>
            </h1>
            <div className="raya" />
            <h3 className="text-21 wither mid-grey mb-8">
              <b>Faster Construction, Better Results</b>
            </h3>
          </div>
          <p className="text-advantage text-21 wither mid-grey">
            Our modular system ensures quicker project completion through
            controlled manufacturing and streamlined installation.
          </p>
          <div className="raya-1" />
          <h3 className="advantage-cell-1 text-21 wither mid-grey mb-8">
            60-70% Faster
          </h3>
        </div>
        <div
          className="advantage-4 detail inline-block bottom-left text-left"
          id="detail-2"
        >
          <div className="advantage-title">
            <h3 className="text-21 wither mid-grey mb-8">
              <b>Strong, Lightweight, and Efficient</b>
            </h3>
            <div className="raya" />
            <h1 className="text-21 wither mid-grey">
              <b>
                125% stronger than
                <br />
                traditional methods
              </b>
            </h1>
          </div>
          <p className="text-advantage text-21 wither mid-grey">
            Our system uses Cold-Formed Steel (CFS), offering exceptional
            strength, durability, and efficiency, enabling lighter structures
            without compromising integrity.
          </p>
          <div className="raya-2" />
          <h3 className="advantage-cell-2 text-21 wither mid-grey mb-8">
            125% stronger than
            <br />
            traditional methods
          </h3>
        </div>
      </div>
    </section>
  );
};

export default ModularDesign;
