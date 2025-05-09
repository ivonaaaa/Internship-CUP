export enum MapElementTypes {
  ZONE = "ZONE",
  POINT = "POINT",
}

export enum ObjectType {
  ANCHOR,
  LIGHTHOUSE,
  FUEL_DOCK,
  RIDGE,
  HARBOR_MASTER,
}
export enum RuleType {
  INFO = "INFO",
  WARNING = "WARNING",
  RESTRICTION = "RESTRICTION",
}

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
    objectType?: ObjectType;
  };
  geometry: {
    type: string;
    coordinates?: (number | number[][])[];
  };
  rule?: {
    id?: number;
    description?: string;
    name?: string;
    type?: RuleType;
  };
};
