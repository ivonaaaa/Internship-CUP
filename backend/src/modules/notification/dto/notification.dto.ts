import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
  @ApiProperty({ description: 'Notification ID' })
  id: number;

  @ApiProperty({ description: 'User ID' })
  userId: number;

  @ApiProperty({ description: 'Boat ID' })
  boatId: number;

  @ApiProperty({ description: 'Map Element ID' })
  mapElementId: number;

  @ApiProperty({ description: 'Rule ID' })
  ruleId: number;

  @ApiProperty({ description: 'Timestamp of notification' })
  timestamp: Date;

  @ApiProperty({ description: 'Location coordinates in GeoJSON format' })
  locationCoordinates: {
    type: string;
    coordinates: [number, number];
  };
}
