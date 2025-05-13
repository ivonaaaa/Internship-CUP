import { MapElement } from "../../types";
import * as turf from "@turf/turf";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Notification } from "../Notification/Notification";
import { RuleType } from "../../types";
import { useCreateNotification } from "../../api/notification/useCreateNotification";
import { useUserBoats } from "../../api/boat/useBoatQueries";
import { useAuth } from "../../contexts/AuthContext";

type RuleCheckerProps = {
  userLocation: [number, number] | null;
  isTracking: boolean;
  mapElements: MapElement[] | undefined;
};

type NotificationType = {
  type: RuleType;
  title: string;
  message: string | undefined;
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
  const { mutate: createNotification } = useCreateNotification();

  const { user } = useAuth();

  const { data: userBoats } = useUserBoats(user?.id || 0);

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

      if (speedKmh > 50) {
        console.log("Speed limit exceeded!");
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
          showNotification(element, distanceInMeters);
        }
      } else if (element.geometry.type === "POINT") {
        const point = turf.point(
          element.geometry.coordinates as [number, number]
        );
        const distance = turf.distance(userPoint, point, {
          units: "kilometers",
        });

        const distanceInMeters = distance * 1000;

        if (distanceInMeters < 1000000) {
          showNotification(element, distanceInMeters);
        }
      }
    });
  };

  const onClose = () => {
    toast.dismiss();
  };

  const showNotification = (element: MapElement, distance?: number) => {
    const now = Date.now();

    if (now - lastNotificationTimeRef.current < 1000) {
      return;
    }

    const existingNotification = previousNotifications.find(
      (notification) =>
        notification.title === element.properties.name &&
        notification.message === element.properties.description
    );

    if (existingNotification) return;

    setPreviousNotifications((prev) => [
      ...prev,
      {
        type: element.rule?.type as RuleType,
        title: element.properties.name,
        message: element.properties.description,
      },
    ]);

    const notificationData = {
      userId: user?.id || 0,
      boatId: userBoats?.[0]?.id,
      mapElementId: element.properties.id,
      ruleId: element.rule?.id || 0,
      locationCoordinates: {
        type: element.geometry.type,
        coordinates: userLocation,
      },
    };

    createNotification(notificationData);

    toast.custom(
      () => (
        <Notification
          type={element.rule?.type as RuleType}
          title={element.properties.name}
          message={element.properties.description || ""}
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
