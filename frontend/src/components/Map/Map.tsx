import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import c from "./Map.module.css";
import { useEffect, useRef } from "react";
import { MAPBOX_STYLE } from "../../constants";
// import { restrictedZones } from "./mockDataZones";
import { Zone } from "../../types";
import { useFetchMapElements } from "../../api/map/useFetchMapElements";

import anchor from "../../assets/anchor.png";

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { data: mapElements } = useFetchMapElements();

  console.log("Map elements", mapElements);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN as string;

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: MAPBOX_STYLE,
      center: [16.4, 43.5081],
      zoom: 11.5,
      minZoom: 10,
      maxZoom: 18,
      maxBounds: [
        [16.2, 43.3],
        [16.7, 43.7],
      ],
      attributionControl: false,
      logoPosition: "top-right",
    });

    map.current.on("load", () => {
      // First, add the restricted zones
      Object.entries(mapElements).forEach(([key, zone]: [string, any]) => {
        // Check if source already exists before adding
        if (!map.current?.getSource(key)) {
          map.current?.addSource(`${key}`, {
            type: "geojson",
            data: zone as any, //neka ostane za sad
          });

          map.current?.addLayer({
            id: `${key}-area`,
            type: "fill",
            source: `${key}`,
            layout: {},
            paint: {
              "fill-color": zone.fillColor,
              "fill-opacity": zone.fillOpacity,
            },
          });

          map.current?.addLayer({
            id: "noAnchoring-outline",
            type: "line",
            source: "noAnchoring",
            layout: {},
            paint: {
              "line-color": restrictedZones.noAnchoring.lineColor || "black",
              "line-width": 2, // Adjust the width as needed
              "line-dasharray": [1, 1], // Creates a dashed line (smaller values = more dots)
            },
          });
        }
      });

      if (!map.current?.hasImage("anchor-icon")) {
        map.current?.loadImage(anchor, (error, image: any) => {
          if (error) throw error;

          map.current?.addImage("anchor-icon", image);

          if (!map.current?.getSource("anchor-places")) {
            map.current?.addSource("anchor-places", {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {
                  name: "Mesto za sidrenje",
                  description: "U ovoj zoni je dozvoljeno sidrenje brodova.",
                  id: "anchor-place",
                },
                geometry: {
                  type: "Point",
                  coordinates: [16.4512, 43.5],
                },
              },
            });

            map.current?.addLayer({
              id: "anchor-place-symbol",
              type: "symbol",
              source: "anchor-places",
              layout: {
                "icon-image": "anchor-icon",
                "icon-size": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  10,
                  0.04,
                  18,
                  0.08,
                ],
                "icon-allow-overlap": true,
              },
            });
          }
        });
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return <div ref={mapContainer} className={c.map}></div>;
};
