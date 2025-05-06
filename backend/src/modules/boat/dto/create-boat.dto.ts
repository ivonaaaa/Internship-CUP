import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from '@nestjs/class-validator';
import { BoatType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoatDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  length: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  width: number;

  @ApiProperty({ enum: BoatType, required: false })
  @IsEnum(BoatType)
  @IsOptional()
  boatType?: BoatType;
}
