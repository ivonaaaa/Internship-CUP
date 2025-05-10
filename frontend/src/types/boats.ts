export interface Boat {
  id: number;
  userId: number;
  name: string;
  length: number;
  width: number;
  boatType?: "MOTORBOAT" | "SAILBOAT" | "JET_SKI" | "YACHT" | "OTHER";
}

export interface CreateBoatDto {
  name: string;
  length: number;
  width: number;
  boatType?: "MOTORBOAT" | "SAILBOAT" | "JET_SKI" | "YACHT" | "OTHER";
}

export interface UpdateBoatDto {
  name: string;
  length?: number;
  width?: number;
  boatType?: "MOTORBOAT" | "SAILBOAT" | "JET_SKI" | "YACHT" | "OTHER";
}
