import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsObject,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MapElementType, MapElementColor } from '@prisma/client';

export class CreateMapElementDto {
  @ApiProperty({
    description: 'The ID of the associated rule',
    example: 1,
  })
  @IsInt()
  ruleId: number;

  @ApiProperty({
    description: 'The name of the map element',
    example: 'No Fishing Zone',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The type of map element',
    enum: MapElementType,
    example: MapElementType.ZONE,
  })
  @IsEnum(MapElementType)
  type: MapElementType;

  @ApiProperty({
    description: 'The color of the map element',
    enum: MapElementColor,
    example: MapElementColor.RED,
  })
  @IsEnum(MapElementColor)
  color: MapElementColor;

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
  })
  @IsObject()
  coordinates: any;

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
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
