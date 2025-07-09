import { useEffect, useRef } from "react";
import * as THREE from "three";

const AnimatedBackground = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const breakpoints = {
      sm: 640,
      md: 2100,
      lg: 3200,
    };

    const getRadius = (vw) => {
      if (vw < breakpoints.sm) return 1.2;
      if (vw < breakpoints.md) return 2.2;
      if (vw > breakpoints.lg) return 3.3;
      return 2.2;
    };

    const getBlur = (vw) => {
      if (vw < breakpoints.sm) return 66;
      if (vw < breakpoints.md) return 106;
      if (vw > breakpoints.lg) return 530;
      return 106;
    };

    const applyBlur = () => {
      if (mountRef.current) {
        mountRef.current.style.filter = `blur(${getBlur(vw)}px)`;
      }
    };

    const vw = window.innerWidth;
    applyBlur();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(getRadius(vw), 8, 8);

    // Material ahora soporta transparencia
    const material = new THREE.MeshBasicMaterial({
      color: "#162d57",
      transparent: true,
      opacity: 1,
    });

    const spheres = [];

    for (let i = 0; i < (vw < 600 ? 10 : 5); i++) {
      const sphere = new THREE.Mesh(geometry, material.clone()); // ¡Importante clonar el material!
      sphere.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * (vw < 600 ? 10 : 5)
      );

      sphere.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * (vw < 600 ? 0.2 : 0.017)
        ),
      };

      const maxScale = 1;
      const minScale = 0.4;
      const maxZ = 10;
      const distanceFromCamera = Math.abs(sphere.position.z);
      const scaleFactor = THREE.MathUtils.clamp(
        1 - distanceFromCamera / maxZ,
        minScale,
        maxScale
      );
      sphere.scale.set(scaleFactor, scaleFactor, scaleFactor);

      scene.add(sphere);
      spheres.push(sphere);
    }

    function animate() {
      requestAnimationFrame(animate);

      spheres.forEach((sphere) => {
        const { velocity } = sphere.userData;

        sphere.position.add(velocity);

        const limit = 6;
        ["x", "y", "z"].forEach((axis) => {
          if (sphere.position[axis] > limit || sphere.position[axis] < -limit) {
            velocity[axis] *= -1;
            sphere.position[axis] = THREE.MathUtils.clamp(
              sphere.position[axis],
              -limit,
              limit
            );
          }
        });

        // --------- Animaciones especiales aquí ---------

        const distance = sphere.position.distanceTo(camera.position);

        const maxDistance = 5;
        const minDistance = 1;
        const deformationStrength = 2;

        // Normalización: 0 (pegado) a 1 (lejos)
        let normalized = THREE.MathUtils.clamp(
          (distance - minDistance) / (maxDistance - minDistance),
          0,
          1
        );

        // Deformación
        const deformFactor = 1 + (1 - normalized) * deformationStrength;
        sphere.scale.set(deformFactor, 1 / deformFactor, deformFactor);

        // Opacidad controlada solo en los últimos 20% de cercanía
        const fadeStart = 1; // 20%
        let opacity = 1.0;

        if (normalized < fadeStart) {
          const fadeProgress = normalized / fadeStart;
          opacity = Math.pow(fadeProgress, 3); // easeIn cuadrado
        }

        sphere.material.opacity = opacity;
      });

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        filter: `blur(106px)}`,
        opacity: ".6",
        zIndex: -1,
        overflow: "hidden",
      }}
    />
  );
};

export default AnimatedBackground;
