import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import c from "./Map.module.css";
import { useEffect, useRef } from "react";
import { MAPBOX_STYLE } from "../../constants";
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
      mapElements?.forEach((element: any) => {
        console.log("Element", element);
        if (element.type === "ZONE") {
          addZone(element);
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

  const addZone = (zone: Zone) => {
    const elementId = `${zone.id}-zone`;
    if (!map.current?.getSource(elementId)) {
      map.current?.addSource(elementId, {
        type: "geojson",
        data: zone as any, //neka ostane za sad
      });

      map.current?.addLayer({
        id: elementId,
        type: "fill",
        source: elementId,
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
          "line-color": zone.lineColor,
          "line-width": zone.lineWidth,
        },
      });
    }
  };

  return <div ref={mapContainer} className={c.map}></div>;
};
