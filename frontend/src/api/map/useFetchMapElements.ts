import { api } from "../base";
import { useQuery } from "@tanstack/react-query";
import { MAP_ELEMENTS_PATH } from "../../constants";
import { ObjectType } from "../../types";
import { RuleType } from "../../types/";
import { parseCoordinates } from "../../utils/ParseCoordinates";

type MapElementsResponseDto = {
  id: number;
  ruleId: number;
  rule?: {
    id: number;
    name: string;
    description: string;
    type: RuleType;
  };
  description?: string;
  isActive: boolean;
  name: string;
  type: string;
  objectType: ObjectType;
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
        objectType: element.objectType,
      },
      geometry: {
        type: element.type,
        coordinates: parseCoordinates(element.coordinates),
      },
      rule: {
        id: element.rule?.id,
        name: element.rule?.name,
        description: element.rule?.description,
        type: element.rule?.type,
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
