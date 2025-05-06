import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import c from "./Map.module.css";
import { useEffect, useRef } from "react";
import { MAPBOX_STYLE } from "../../constants/map";
import { restrictedZones } from "./mockDataZones";
import { Zone } from "../../types";

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN as string;

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: MAPBOX_STYLE,
      center: [16.4411, 43.5081],
      zoom: 12,
      minZoom: 10,
      maxZoom: 18,
      maxBounds: [
        [16.2, 43.3],
        [16.7, 43.7],
      ],
    });

    map.current.on("load", () => {
      Object.entries(restrictedZones).forEach(([key, zone]: [string, Zone]) => {
        map.current?.addSource(`${key}-zones`, {
          type: "geojson",
          data: zone as any, //neka ostane za sad
        });

        map.current?.addLayer({
          id: `${key}-area`,
          type: "fill",
          source: `${key}-zones`,
          layout: {},
          paint: {
            "fill-color": zone.fillColor,
            "fill-outline-color": zone.fillOutlineColor,
          },
        });
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return <div ref={mapContainer} className={c.map}></div>;
};
