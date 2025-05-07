import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsObject,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MapElementType } from '@prisma/client';

export class UpdateMapElementDto {
  @ApiProperty({
    description: 'The ID of the associated rule',
    example: 1,
    required: false,
  })
  @IsInt()
  @IsOptional()
  ruleId?: number;

  @ApiProperty({
    description: 'The name of the map element',
    example: 'No Fishing Zone',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The type of map element',
    enum: MapElementType,
    example: MapElementType.ZONE,
    required: false,
  })
  @IsEnum(MapElementType)
  @IsOptional()
  type?: MapElementType;

  @ApiProperty({
    description: 'The color of the map element',
    example: '#0000FF',
    required: false,
  })
  @IsString()
  @IsOptional()
  fillColor?: string;

  @ApiProperty({
    description: 'GeoJSON coordinates for the map element',
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
    required: false,
  })
  @IsObject()
  @IsOptional()
  coordinates?: any;

  @ApiProperty({
    description: 'Optional description of the map element',
    example: 'Protected marine habitat area',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Whether the map element is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: 0.5 })
  fillOpacity?: number;

  @ApiProperty({ example: '#FF0000' })
  lineColor?: string;

  @ApiProperty({ example: 2 })
  lineWidth?: number;
}
