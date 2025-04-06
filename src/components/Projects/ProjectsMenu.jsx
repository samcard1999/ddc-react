import React from "react";
import { useNavigate } from "react-router-dom";
const ProjectsMenu = () => {
  const navigate = useNavigate();

  return (
    <div id="menuToggle">
      <input type="checkbox" id="menuCheckbox" />

      <span className="menuToggle-span" />
      <span className="menuToggle-span" />
      <span className="menuToggle-span" />

      <ul id="menu">
        <li>
          <button onClick={() => navigate(`/#`)}>Home</button>
        </li>
        <li>
          <button onClick={() => navigate(`/#about`)}>About</button>
        </li>
        <li>
          <button onClick={() => navigate(`/#projects`)}>Projects</button>
        </li>
        <li>
          <button onClick={() => navigate(`/#footer`)}>Contact</button>
        </li>
      </ul>
    </div>
  );
};

export default ProjectsMenu;
