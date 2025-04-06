import React from "react";

const Info = ({ title, address, distribution, description }) => {
  return (
    <div className="flex-item">
      <h1>{title}</h1>
      <h2>{address}</h2>
      <h3>{distribution}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Info;
