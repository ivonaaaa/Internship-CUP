export enum BoatType {
  MOTORBOAT = "MOTORBOAT",
  DINGHY = "DINGHY",
  YACHT = "YACHT",
}

export type Boat = {
  id: number;
  userId: number;
  name: string;
  length: number;
  width: number;
  boatType?: BoatType;
  registration: string;
};

export interface CreateBoatDto {
  userId: number;
  name: string;
  registration: string;
  length: number;
  width: number;
  boatType?: BoatType;
}

export interface UpdateBoatDto {
  userId: number;
  name?: string;
  registration?: string;
  length?: number;
  width?: number;
  boatType?: BoatType;
}
