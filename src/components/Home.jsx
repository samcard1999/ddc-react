import React, { useEffect } from "react";
import Header from "./Header.jsx";
import About from "./About.jsx";
import Projects from "./Carousel/Projects.jsx";
import ModularDesign from "./ModularDesign.jsx";
import Footer from "./Footer.jsx";
import Menu from "./Menu.jsx";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1)); // Elimina el #
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [hash]);
  return (
    <>
      <Helmet>
        <title>
          The DDC Way | Fast & Sustainable Modular Construction in Miami
        </title>
      </Helmet>
      <Menu />
      <Header />
      <About />
      <Projects />
      <ModularDesign />
      <Footer />
    </>
  );
};

export default Home;
