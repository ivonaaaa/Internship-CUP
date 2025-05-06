import { IsInt, IsObject } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationDto {
  @IsInt()
  @ApiProperty({ description: 'User ID', required: false })
  userId?: number;

  @IsInt()
  @ApiProperty({ description: 'Boat ID', required: false })
  boatId?: number;

  @IsInt()
  @ApiProperty({ description: 'Map Element ID', required: false })
  mapElementId?: number;

  @IsInt()
  @ApiProperty({ description: 'Rule ID', required: false })
  ruleId?: number;

  @IsObject()
  @ApiProperty({
    description: 'Location coordinates in GeoJSON format',
    required: false,
  })
  locationCoordinates: {
    type: string;
    coordinates: [number, number];
  };
}
