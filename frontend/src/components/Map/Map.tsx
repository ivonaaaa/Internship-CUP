import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import c from "./Map.module.css";
import { useEffect, useRef, useCallback } from "react";
import { MAPBOX_STYLE } from "../../constants";
import { MapElement } from "../../types";
import { useFetchMapElements } from "../../api/map/useFetchMapElements";
import { MapIcons } from "../../constants/map-icons";

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { data: mapElements } = useFetchMapElements();

  const handleMapLoad = useCallback(() => {
    if (!mapElements) return;

    mapElements.forEach((element: MapElement) => {
      if (element.geometry.type === "Polygon") {
        addZone(element);
      } else if (element.geometry.type === "POINT") {
        addPoint(element);
      }
    });
  }, [mapElements]);

  useEffect(() => {
    if (!mapElements) return;

    if (!map.current) {
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
    }

    if (map.current) {
      if (map.current.loaded()) {
        handleMapLoad();
      } else {
        map.current.once("load", handleMapLoad);
      }
    }

    return () => {
      if (map.current) {
        map.current.off("load", handleMapLoad);
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapElements, handleMapLoad]);

  const addZone = (zone: MapElement) => {
    const elementId = `${zone.properties.id}-zone`;

    if (!map.current?.getSource(elementId)) {
      const geoJsonData = {
        type: "Feature",
        properties: zone.properties,
        geometry: {
          type: "Polygon",
          coordinates: zone.geometry.coordinates,
        },
      };

      map.current?.addSource(elementId, {
        type: "geojson",
        data: geoJsonData,
      });

      map.current?.addLayer({
        id: elementId,
        type: "fill",
        source: elementId,
        layout: {},
        paint: {
          "fill-color": zone.properties.fillColor,
          "fill-opacity": zone.properties.fillOpacity,
        },
      });

      if (zone.properties.lineColor) {
        map.current?.addLayer({
          id: `${elementId}-outline`,
          type: "line",
          source: elementId,
          paint: {
            "line-color": zone.properties.lineColor,
            "line-width": zone.properties.lineWidth,
          },
        });
      }
    }
  };

  const addPoint = (point: MapElement) => {
    const elementId = `${point.properties.id}-point`;
    const iconName = point.properties.name;

    if (!map.current?.hasImage(iconName)) {
      const iconPath = MapIcons[iconName as keyof typeof MapIcons];

      map.current?.loadImage(iconPath, (error, image) => {
        if (error) {
          console.error("Error loading image:", error);
          return;
        }

        if (!image) {
          console.error("Image loaded but is undefined");
          return;
        }

        map.current?.addImage(iconName, image);

        if (!map.current?.getSource(elementId)) {
          const geoJsonData = {
            type: "Feature",
            properties: point.properties,
            geometry: {
              type: "Point",
              coordinates: point.geometry.coordinates as [number, number],
            },
          };

          map.current?.addSource(elementId, {
            type: "geojson",
            data: geoJsonData,
          });

          map.current?.addLayer({
            id: elementId,
            type: "symbol",
            source: elementId,
            layout: {
              "icon-image": iconName,
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
  };

  return <div ref={mapContainer} className={c.map}></div>;
};
