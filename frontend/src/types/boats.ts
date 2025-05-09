export interface Boat {
  id: number;
  userId: number;
  length: number;
  width: number;
  boatType?: "MOTORBOAT" | "SAILBOAT" | "JET_SKI" | "YACHT" | "OTHER";
}

export interface CreateBoatDto {
  length: number;
  width: number;
  boatType?: "MOTORBOAT" | "SAILBOAT" | "JET_SKI" | "YACHT" | "OTHER";
}

export interface UpdateBoatDto {
  length?: number;
  width?: number;
  boatType?: "MOTORBOAT" | "SAILBOAT" | "JET_SKI" | "YACHT" | "OTHER";
}
