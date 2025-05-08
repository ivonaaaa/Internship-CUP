import { api } from "../base";
import { useQuery } from "@tanstack/react-query";
import { MAP_ELEMENTS_PATH } from "../../constants";

type MapElementsResponseDto = {
  id: number;
  ruleId: number;
  rule?: {
    id: number;
    name: string;
    description: string;
    alertColor: string;
  };
  description?: string;
  isActive: boolean;
  name: string;
  type: string;
  coordinates: { coordinates: number[][][] | number[] };
  fillColor?: string;
  fillOpacity?: number;
  lineColor?: string;
  lineWidth?: number;
};

const fetchMapElements = async () => {
  const response = await api.get<never, MapElementsResponseDto[]>(
    MAP_ELEMENTS_PATH
  );

  return response.map((element: MapElementsResponseDto) => {
    return {
      type: "Feature" as string,
      properties: {
        name: element.name,
        description: element.description,
        id: element.id,
        fillColor: element.fillColor,
        fillOpacity: element.fillOpacity,
        lineColor: element.lineColor,
        lineWidth: element.lineWidth,
      },
      geometry: {
        type: element.type,
        coordinates: parseCoordinates(element.coordinates),
      },
    };
  });
};

export const useFetchMapElements = () => {
  return useQuery({
    queryKey: ["mapElements"],
    queryFn: fetchMapElements,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

const parseCoordinates = (coordinates: {
  coordinates: number[][][] | number[];
}) => {
  const parsedCoordinates = coordinates.coordinates;

  if (Array.isArray(parsedCoordinates) && parsedCoordinates.length === 2) {
    return [parsedCoordinates[0], parsedCoordinates[1]];
  }

  if (
    Array.isArray(parsedCoordinates) &&
    Array.isArray(parsedCoordinates[0]) &&
    Array.isArray(parsedCoordinates[0][0])
  ) {
    return [...parsedCoordinates];
  }
};
