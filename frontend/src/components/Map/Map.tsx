import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import c from "./Map.module.css";
import { useEffect, useRef } from "react";

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN as string;

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [16.4411, 43.5081],
      zoom: 12,
      minZoom: 10,
      maxZoom: 18,
      maxBounds: [
        [16.2, 43.3],
        [16.7, 43.7],
      ],
    });
  }, []);

  return <div ref={mapContainer} className={c.map}></div>;
};
