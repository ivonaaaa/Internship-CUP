export type Zone = {
  type: string;
  name: string;
  description: string;
  id: number;
  alertColor: string;
  coordinates: number[][][] | number[];
  fillColor?: string;
  fillOpacity?: number;
  lineColor?: string;
  lineWidth?: number;
};
