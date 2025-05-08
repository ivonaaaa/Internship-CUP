export type MapElement = {
  type: string;
  properties: {
    name: string;
    description?: string;
    id: number;
    fillColor?: string;
    fillOpacity?: number;
    lineColor?: string;
    lineWidth?: number;
  };
  geometry: {
    type: string;
    coordinates?: (number | number[][])[];
  };
  rule: {
    id: number;
    description: string;
    name: string;
  };
};

export enum MapElementTypes {
  ZONE = "ZONE",
  POINT = "POINT",
}
