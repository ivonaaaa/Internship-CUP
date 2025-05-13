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

import {
  infoButton,
  sosButton,
  plusButton,
  minusButton,
  profileButton,
  compassButton,
} from "./buttons";
import { SoundAlertNotification } from "../SoundAlertNotification";

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [showSoundAlert, setShowSoundAlert] = useState<boolean>(false);
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
    if (!map.current) return;

    const elementId = `${zone.properties.id}-zone`;

    if (!map.current.getSource(elementId)) {
      const geoJsonData = {
        type: "Feature",
        properties: zone.properties,
        geometry: {
          type: "Polygon",
          coordinates: zone.geometry.coordinates,
        },
      };

      map.current.addSource(elementId, {
        type: "geojson",
        data: geoJsonData as any,
      });

      map.current.addLayer({
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
        map.current.addLayer({
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
    if (!map.current) return;

    const elementId = `${point.properties.id}-point`;
    const iconName = point.properties.name;
    const objectType = point.properties.objectType;

    if (!map.current.hasImage(iconName)) {
      const iconPath = MapIcons[objectType as unknown as keyof typeof MapIcons];

      map.current.loadImage(iconPath, (error, image) => {
        if (error) {
          console.error("Error loading image:", error);
          return;
        }

        if (!image || !map.current) {
          console.error(
            "Image loaded but is undefined or map is no longer available"
          );
          return;
        }

        map.current.addImage(iconName, image);

        if (!map.current.getSource(elementId)) {
          const geoJsonData = {
            type: "Feature",
            properties: point.properties,
            geometry: {
              type: "Point",
              coordinates: point.geometry.coordinates as [number, number],
            },
          };

          map.current.addSource(elementId, {
            type: "geojson",
            data: geoJsonData as any,
          });

          map.current.addLayer({
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
                0.08,
                15,
                0.12,
              ],
              "icon-allow-overlap": false,
              "icon-ignore-placement": false,
              "text-field": ["get", "name"],
              "text-offset": [0, 1.5],
              "text-anchor": "top",
              "text-size": 8,
              "text-optional": true,
            },
          });
        }
      });
    }
  };

  const showAlert = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    setShowSoundAlert(true);
  };

  const startTracking = () => {
    setShowSoundAlert(false);
    setIsTracking(true);

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const lngLat = new mapboxgl.LngLat(longitude, latitude);

        setUserLocation([longitude, latitude]);

        if (!map.current || !isMapLoaded) return;

        if (!userMarker.current) {
          const el = document.createElement("div");
          el.className = c.userLocationMarker;

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
        stopTracking();
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      }
    );
  };

  const stopTracking = () => {
    if (!confirm("Are you sure you want to stop tracking your location?")) {
      return;
    }

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

  const removeLayers = () => {
    if (!map.current) return;

    const layers = map.current.getStyle().layers || [];

    const layersToHide = [
      "airport-label",
      "road-label",
      "road-number-shield",
      "settlement-subdivision-label",
      "transit-label",
      "hillshade",
      "contour",
      "terrain",
      // "landcover",
      // "landuse",
    ];

    layers.forEach((layer) => {
      if (layer.id && (layer.id.includes("poi") || layer.id.includes("park"))) {
        map.current?.setLayoutProperty(layer.id, "visibility", "none");
      }
    });

    layersToHide.forEach((layerId) => {
      if (map.current?.getLayer(layerId)) {
        map.current.setLayoutProperty(layerId, "visibility", "none");
      }
    });
  };

  const addPopups = () => {
    if (!map.current) return;

    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,
    });

    mapElements?.forEach((element) => {
      let elementType: string = "";
      if (element.geometry.type === MapElementTypes.ZONE) {
        elementType = "zone";
      } else if (element.geometry.type === MapElementTypes.POINT) {
        elementType = "point";
      }

      map.current?.on(
        "click",
        `${element.properties.id}-${elementType}`,
        (e) => {
          if (map.current) map.current.getCanvas().style.cursor = "pointer";

          const coordinates = e.lngLat;
          const properties = e.features?.[0].properties;

          const description = `
    <div class={c.customPopup}>
      <h3>${properties?.name}</h3>
      <p>${properties?.description}</p>
    </div>
  `;

          popup
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map.current as mapboxgl.Map);
        }
      );
    });
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!map.current) {
      mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: MAPBOX_STYLE,
        center: [16.43, 43.5081],
        zoom: 12.5,
        minZoom: 10,
        maxZoom: 18,
        maxBounds: [
          [16.2, 43.3],
          [16.7, 43.7],
        ],
        attributionControl: false,
        logoPosition: "top-right",
        antialias: true,
        touchZoomRotate: true,
        fadeDuration: 300,
        pitchWithRotate: true,
      });

      map.current.on("load", () => {
        removeLayers();
        handleMapLoad();
        addPopups();
        setIsMapLoaded(true);
      });
    }

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }

      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapElements]);

  return (
    <>
      <div ref={mapContainer} className={c.map}></div>

      {showSoundAlert && (
        <SoundAlertNotification onClose={() => startTracking()} />
      )}

      <div className={c.customNav}>
        <img
          src={plusButton}
          onClick={() => map.current?.zoomIn()}
          className={c.navButton}
        ></img>
        <img
          src={minusButton}
          onClick={() => map.current?.zoomOut()}
          className={c.navButton}
        ></img>
        <img
          src={compassButton}
          onClick={() => map.current?.resetNorth()}
          className={c.navButton}
        ></img>
      </div>

      <img
        src={profileButton}
        className={`${c.profileButton} ${c.generalButton}`}
        onClick={() => navigate(ROUTES.PROFILE)}
      ></img>
      <img
        src={infoButton}
        className={`${c.infoButton} ${c.generalButton}`}
        onClick={() => navigate(ROUTES.INFO)}
      ></img>
      <img
        src={sosButton}
        className={`${c.emergencyButton} ${c.generalButton}`}
        onClick={() => {
          confirm("Confirm to call emergency services");
        }}
      ></img>

      <div
        className={`${c.trackerButton} ${!isTracking ? `${c.trackerButtonStart}` : `${c.trackerButtonStop}`}`}
        onClick={isTracking ? stopTracking : showAlert}
      >
        {isTracking ? "Stop" : "Start"}
      </div>

      <RuleChecker
        userLocation={userLocation}
        isTracking={isTracking}
        mapElements={mapElements}
      />
    </>
  );
};
