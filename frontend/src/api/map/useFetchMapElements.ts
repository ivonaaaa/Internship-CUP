import { api } from "../base";
import { useQuery } from "@tanstack/react-query";
import { MAP_ELEMENTS_PATH } from "../../constants";

type MapElementsResponseDto = {
  id: string;
  name: string;
  type: string;
  coordinates: number[][][] | number[][] | number[];
  fillColor: string;
  fillOpacity: number;
  lineColor: string;
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
