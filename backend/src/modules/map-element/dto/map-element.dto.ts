import { ApiProperty } from '@nestjs/swagger';
import { MapElementType, MapElementColor } from '@prisma/client';

export class MapElementDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  ruleId: number;

  @ApiProperty({ example: 'No Fishing Zone' })
  name: string;

  @ApiProperty({ enum: MapElementType, example: MapElementType.ZONE })
  type: MapElementType;

  @ApiProperty({ enum: MapElementColor, example: MapElementColor.RED })
  color: MapElementColor;

  @ApiProperty({
    example: {
      type: 'Polygon',
      coordinates: [
        [
          [13.384, 52.516],
          [13.385, 52.516],
          [13.385, 52.517],
          [13.384, 52.517],
          [13.384, 52.516],
        ],
      ],
    },
  })
  coordinates: any;

  @ApiProperty({ example: 'Protected marine habitat area', required: false })
  description?: string;

  @ApiProperty({ example: true })
  isActive: boolean;
}
