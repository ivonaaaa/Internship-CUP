export type MapElement = {
  type: string;
  properties: {
    name: string;
    description: string;
    id: number;
    fillColor?: string;
    fillOpacity?: number;
    lineColor?: string;
    lineWidth?: number;
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[];
  };
};

export enum MapElementTypes {
  ZONE = "ZONE",
  POINT = "POINT",
}
