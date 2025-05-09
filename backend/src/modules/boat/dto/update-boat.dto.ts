import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from '@nestjs/class-validator';
import { BoatType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBoatDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  registration?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  length?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  width?: number;

  @ApiProperty({ enum: BoatType, required: false })
  @IsEnum(BoatType)
  @IsOptional()
  boatType?: BoatType;
}
