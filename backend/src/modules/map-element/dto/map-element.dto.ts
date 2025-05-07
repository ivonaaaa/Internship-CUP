import { ApiProperty } from '@nestjs/swagger';
import { MapElementType } from '@prisma/client';
import { RuleDto } from 'src/modules/rule/dto/rule.dto';

export class MapElementDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  ruleId: number;

  @ApiProperty({ type: RuleDto })
  rule?: RuleDto;

  @ApiProperty({ example: 'No Fishing Zone' })
  name: string;

  @ApiProperty({ enum: MapElementType, example: MapElementType.ZONE })
  type: MapElementType;

  @ApiProperty({ example: '#0000FF' })
  fillColor?: string;

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

  @ApiProperty({ example: 0.5 })
  fillOpacity?: number;

  @ApiProperty({ example: '#FF0000' })
  lineColor?: string;

  @ApiProperty({ example: 2 })
  lineWidth?: number;
}
