import React from "react";
import { Link } from "react-router-dom";

const CustomSlide = ({ title, image, price, onClick }) => {
  return (
    <div onClick={onClick}>
      <div className="info-gallery">
        <h1>{title}</h1>
        <h2>Gallery</h2>
      </div>
      <img src={image} alt={title} className="project-image" loading="lazy" />
      <h1 className="price">{price}</h1>
    </div>
  );
};

export default CustomSlide;
