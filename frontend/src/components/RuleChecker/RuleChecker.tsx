import { MapElement } from "../../types";
import * as turf from "@turf/turf";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Notification } from "../Notification/Notification";
import { RuleType } from "../../types";

type RuleCheckerProps = {
  userLocation: [number, number] | null;
  isTracking: boolean;
  mapElements: MapElement[] | undefined;
};

type NotificationType = {
  type: RuleType;
  title: string;
  message: string;
};

export const RuleChecker = ({
  userLocation,
  isTracking,
  mapElements,
}: RuleCheckerProps) => {
  if (!isTracking || !userLocation) return <></>;

  const [previousNotifications, setPreviousNotifications] = useState<
    NotificationType[]
  >([]);
  const lastNotificationTimeRef = useRef<number>(0);

  const previousLocationRef = useRef<[number, number] | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const calculateSpeed = () => {
    if (!userLocation) return;

    const currentTime = Date.now();

    if (previousLocationRef.current && previousTimeRef.current) {
      const timeDiffSec = (currentTime - previousTimeRef.current) / 1000;

      const from = turf.point(previousLocationRef.current);
      const to = turf.point(userLocation);

      const distanceKm = turf.distance(from, to, { units: "kilometers" });
      const speedKmh = (distanceKm / timeDiffSec) * 3600;

      console.log("Speed (km/h):", speedKmh.toFixed(2));

      if (speedKmh > 100) {
        showNotification(
          "WARNING",
          "High Speed Alert",
          `You are moving too fast! (${speedKmh.toFixed(1)} km/h)`,
          speedKmh
        );
      }
    }

    previousLocationRef.current = userLocation;
    previousTimeRef.current = currentTime;
  };

  const calculateDistance = () => {
    const userPoint = turf.point(userLocation);

    mapElements?.forEach((element: MapElement) => {
      if (element.geometry.type === "ZONE") {
        const zone = turf.polygon(element.geometry.coordinates as [number[][]]);
        const distance = turf.pointToPolygonDistance(userPoint, zone, {
          units: "kilometers",
        });

        const distanceInMeters = distance * 1000;

        if (distanceInMeters < 200) {
          showNotification(
            element.rule?.type || "INFO",
            element.properties.name,
            element.rule?.description || "Caution! You are near a zone.",
            distanceInMeters
          );
        }
      } else if (element.geometry.type === "POINT") {
        const point = turf.point(
          element.geometry.coordinates as [number, number]
        );
        const distance = turf.distance(userPoint, point, {
          units: "kilometers",
        });

        const distanceInMeters = distance * 1000;

        if (distanceInMeters < 100) {
          showNotification(
            element.rule?.type || "INFO",
            element.properties.name,
            element.rule?.description || "You're near a point of interest.",
            distanceInMeters
          );
        }
      }
    });
  };

  const onClose = () => {
    toast.dismiss();
  };

  const showNotification = (
    type: RuleType | string,
    title: string,
    message: string,
    distance?: number
  ) => {
    const now = Date.now();

    if (now - lastNotificationTimeRef.current < 1000) {
      return;
    }

    const existingNotification = previousNotifications.find(
      (notification) =>
        notification.title === title && notification.message === message
    );

    if (existingNotification) return;

    setPreviousNotifications((prev) => [
      ...prev,
      { type: type as RuleType, title, message },
    ]);

    toast.custom(
      () => (
        <Notification
          type={type as RuleType}
          title={title}
          message={message}
          distance={distance}
          onClose={onClose}
        />
      ),
      {
        duration: 5000,
      }
    );

    lastNotificationTimeRef.current = now;
  };

  useEffect(() => {
    if (userLocation) calculateSpeed();
  }, [userLocation]);

  useEffect(() => {
    if (mapElements) calculateDistance();
  }, [userLocation, mapElements]);

  return <></>;
};
