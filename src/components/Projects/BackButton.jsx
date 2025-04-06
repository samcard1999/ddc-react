import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="back-button">
      <div onClick={() => navigate(-1)}>
        <svg
          id="boton_atras"
          data-name="Capa 2"
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={30}
          viewBox="0 0 85.14 85.14"
        >
          <g id="Capa_1-2" data-name="Capa 1">
            <g>
              <polyline
                points="70.39 42 19.04 42 37 24.05 19.04 42 37 59.96"
                style={{
                  fill: "none",
                  stroke: "#dcdfe2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 4
                }}
              />
              <circle
                cx="42.57"
                cy="42.57"
                r="40.57"
                style={{
                  fill: "none",
                  stroke: "#dcdfe2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 4
                }}
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default BackButton;
