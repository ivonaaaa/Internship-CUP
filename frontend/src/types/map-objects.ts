export type Zone = {
  type: string;
  properties: {
    name: string;
    description: string;
    id: string;
    alertColor: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[];
  };
  fillColor?: string;
  fillOpacity?: number;
  lineColor?: string;
  lineWidth?: number;
};
