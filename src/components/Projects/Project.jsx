import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Carousel from "./Carousel";
import Info from "./Info";
import BackButton from "./BackButton";
import "../styles/projects-inside.css";
import { Helmet } from "react-helmet";
import projectsData from "../../data/projects.json";
import ProjectsMenu from "./ProjectsMenu";
import { ContactForm } from "./ContactForm";

const Project = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const foundProject = projectsData.find((p) => p.id === projectId);
    setProject(foundProject);

    window.scrollTo(0, 0);
  }, [projectId, pathname]);
  if (!project) return <div className="loading">Cargando proyecto...</div>;

  return (
    <>
      <Helmet>
        <title>{project.title}</title>
      </Helmet>
      <div className="project-container">
        <div className="mobile-banner">
          <ContactForm />
          <ProjectsMenu />
        </div>
        <Info
          title={project.title}
          address={project.address}
          distribution={project.distribution}
          description={project.description}
        />
        <Carousel
          title_villa={project.title}
          images_folder={project.folder}
          total_images={project.total_images}
          coordenadas={project.coordenadas}
          mapaWidthPx={project.mapa.width}
          mapaHeightPx={project.mapa.height}
          floor_2_mapaWidthPx={project.mapa.width_floor_2}
          floor_2_mapaHeightPx={project.mapa.height_floor_2}
        />
        <BackButton />
      </div>
    </>
  );
};

export default Project;
