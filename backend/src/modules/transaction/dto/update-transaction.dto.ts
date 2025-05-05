import {
  IsNumber,
  IsInt,
  IsEnum,
  IsDate,
  IsOptional,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionStatus } from '@prisma/client';
import { Type } from '@nestjs/class-transformer';

export class UpdateTransactionDto {
  @ApiProperty({
    description: 'Transaction amount',
    example: 49.99,
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  amount?: number;

  @ApiProperty({
    description: 'Transaction status',
    enum: TransactionStatus,
    example: TransactionStatus.SUCCESSFUL,
    required: false,
  })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @ApiProperty({
    description: 'Transaction date',
    example: new Date(),
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  transactionDate?: Date;
}
