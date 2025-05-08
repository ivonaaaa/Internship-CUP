import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import c from "./Map.module.css";
import { useEffect, useRef, useCallback, useState } from "react";
import { MAPBOX_STYLE } from "../../constants";
import { MapElement } from "../../types";
import { useFetchMapElements } from "../../api/map/useFetchMapElements";
import { MapIcons } from "../../constants/map-icons";
import { MapElementTypes } from "../../types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import { RuleChecker } from "../RuleChecker";
import { NotificationPanel } from "../NotificationPanel";

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [areNotificationsVisible, setAreNotificationsVisible] =
    useState<boolean>(false);
  const watchId = useRef<number | null>(null);
  const { data: mapElements } = useFetchMapElements();

  const navigate = useNavigate();

  const handleMapLoad = useCallback(() => {
    if (!mapElements) return;

    mapElements.forEach((element: MapElement) => {
      if (element.geometry.type === MapElementTypes.ZONE) {
        addZone(element);
      } else if (element.geometry.type === MapElementTypes.POINT) {
        addPoint(element);
      }
    });
  }, [mapElements]);

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
        data: geoJsonData as any,
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
    const objectType = point.properties.objectType;

    if (!map.current?.hasImage(iconName)) {
      const iconPath = MapIcons[objectType as unknown as keyof typeof MapIcons];

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
            data: geoJsonData as any,
          });

          //stavi ovo u options i importaj iz drugog fajla
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
                0.1,
                18,
                0.15,
              ],
              "icon-allow-overlap": true,
            },
          });
        }
      });
    }
  };

  const startTracking = () => {
    setIsTracking(true);

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const lngLat = new mapboxgl.LngLat(longitude, latitude);

        setUserLocation([longitude, latitude]);

        if (!map.current || !mapLoaded) return;

        //vidi jel moze ovo bolje
        if (!userMarker.current) {
          const el = document.createElement("div");
          el.className = "user-location-marker";
          el.style.width = "20px";
          el.style.height = "20px";
          el.style.borderRadius = "50%";
          el.style.background = "#1da1f2";
          el.style.border = "3px solid white";
          el.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";

          userMarker.current = new mapboxgl.Marker({
            element: el,
            anchor: "center",
          })
            .setLngLat(lngLat)
            .addTo(map.current as mapboxgl.Map);
        } else {
          userMarker.current.setLngLat(lngLat);
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      }
    );
  };

  const stopTracking = () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }

    if (userMarker.current) {
      userMarker.current.remove();
      userMarker.current = null;
    }
    setUserLocation(null);
    setIsTracking(false);
  };

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

    if (map.current) {
      map.current.on("load", () => {
        setMapLoaded(true);
      });
    }

    return () => {
      if (map.current) {
        map.current.off("load", handleMapLoad);
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapElements]);

  return (
    <>
      <div ref={mapContainer} className={c.map}></div>

      <div className={c.customNav}>
        <div
          onClick={() => map.current?.zoomIn()}
          className={c.navButton}
        ></div>
        <div
          onClick={() => map.current?.zoomOut()}
          className={c.navButton}
        ></div>
        <div
          onClick={() => map.current?.resetNorth()}
          className={c.navButton}
        ></div>
      </div>

      <div
        className={c.profileButton}
        onClick={() => navigate(ROUTES.PROFILE)}
      ></div>
      <div
        className={c.infoButton}
        onClick={() => navigate(ROUTES.PROFILE)}
      ></div>
      <div className={c.emergencyButton}></div>

      <div
        className={c.notificationButton}
        onClick={() => setAreNotificationsVisible(!areNotificationsVisible)}
      ></div>

      {areNotificationsVisible && <NotificationPanel />}
      <button
        className={c.trackerButton}
        onClick={isTracking ? stopTracking : startTracking}
      >
        {isTracking ? "Stop" : "Start"}
      </button>
      <RuleChecker
        userLocation={userLocation}
        isTracking={isTracking}
        mapElements={mapElements}
      />
    </>
  );
};
