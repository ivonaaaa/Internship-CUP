import { MapElement } from "../../types";
import * as turf from "@turf/turf";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Notification } from "../Notification/Notification";
import { RuleType } from "../../types";

type RuleCheckerProps = {
  userLocation: [number, number] | null;
  isTracking: boolean;
  mapElements: MapElement[] | undefined;
};

export const RuleChecker = ({
  userLocation,
  isTracking,
  mapElements,
}: RuleCheckerProps) => {
  if (!isTracking || !userLocation) return <></>;

  const calculateDistance = () => {
    const userPoint = turf.point(userLocation);

    mapElements?.forEach((element: MapElement) => {
      if (element.geometry.type === "ZONE") {
        const zone = turf.polygon(element.geometry.coordinates as [number[][]]);
        const distance = turf.pointToPolygonDistance(userPoint, zone, {
          units: "kilometers",
        });

        if (distance < 10.1) {
          showNotification(
            element.rule?.type || "INFO",
            element.properties.name,
            element.rule?.description || "Caution! You are near a zone."
          );
        }
      } else if (element.geometry.type === "POINT") {
        const point = turf.point(
          element.geometry.coordinates as [number, number]
        );
        const distance = turf.distance(userPoint, point, {
          units: "kilometers",
        });

        if (distance < 0.1) {
          showNotification(
            element.rule?.type || "INFO",
            element.properties.name,
            element.rule?.description || "You're near a point of interest."
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
    message: string
  ) => {
    toast.custom(
      () => (
        <Notification
          type={type as RuleType}
          title={title}
          message={message}
          onClose={onClose}
        />
      ),
      {
        duration: 5000,
      }
    );
  };

  useEffect(() => {
    if (mapElements) calculateDistance();
  }, [userLocation, mapElements]);

  return <></>;
};
