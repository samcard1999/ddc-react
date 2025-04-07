import React from "react";
import { useSelector } from "react-redux";
const Map = ({ mapa_title }) => {
  const count = useSelector((state) => state.counter.value);
  const { width, height } = useSelector((state) => state.dimensions);
  const floorQuantity = useSelector((state) => state.floorQuantity.value);
  return (
    <div
      className="mapa"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <img
        src={`/assets/images/mapas/${mapa_title}/${
          floorQuantity === 1 ? `mapa.png` : `map_floor_${count}.png`
        }`}
        alt={mapa_title}
        loading="eager"
      />
      <img
        className="camera"
        src="/assets/images/mapas/camera-grey.png"
        alt="camera"
      />
      <img className="shadow" src={null} alt="shadow" />
    </div>
  );
};

export default Map;
