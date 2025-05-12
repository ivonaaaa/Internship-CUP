export type NotificationDto = {
  userId: number;
  boatId?: number;
  mapElementId: number;
  ruleId: number;
  locationCoordinates: {
    type: string;
    coordinates: [number, number];
  };
};
