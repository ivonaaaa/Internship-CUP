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
    coordinates: number[][][];
  };
  fillColor: string;
  fillOutlineColor: string;
};


