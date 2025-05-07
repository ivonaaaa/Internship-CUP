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
  coordinates: number[][][] | number[][] | number[];
  fillColor?: string;
  fillOpacity?: number;
  lineColor?: string;
  lineWidth?: number;
};

const fetchMapElements = () => {
  return api.get<never, MapElementsResponseDto[]>(MAP_ELEMENTS_PATH);
};

export const useFetchMapElements = () => {
  return useQuery({
    queryKey: ["mapElements"],
    queryFn: fetchMapElements,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
