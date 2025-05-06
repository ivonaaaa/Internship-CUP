import { IsInt, IsNotEmpty, IsObject } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'User ID' })
  userId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Boat ID' })
  boatId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Map Element ID' })
  mapElementId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Rule ID' })
  ruleId: number;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({ description: 'Location coordinates in GeoJSON format' })
  locationCoordinates: {
    type: string;
    coordinates: [number, number];
  };
}
