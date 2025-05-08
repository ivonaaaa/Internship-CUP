import { MapElement } from "../../types";
import * as turf from "@turf/turf";
import { useEffect } from "react";
import toast from "react-hot-toast";

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

    console.log(mapElements);

    mapElements?.forEach((element: MapElement) => {
      if (element.geometry.type === "ZONE") {
        const zone = turf.polygon(element.geometry.coordinates as [number[][]]);
        const distance = turf.pointToPolygonDistance(userPoint, zone, {
          units: "kilometers",
        });

        if (distance < 10.1) {
          toast.custom((t) => <div></div>);
        }
      } else if (element.geometry.type === "POINT") {
        const point = turf.point(
          element.geometry.coordinates as [number, number]
        );
        const distance = turf.distance(userPoint, point, {
          units: "kilometers",
        });

        if (distance < 0.1) {
          toast.error(`${element.rule.description}`);
        }
      }
    });
  };

  useEffect(() => {
    if (mapElements) calculateDistance();
  }, [userLocation, mapElements]);

  return <></>;
};
