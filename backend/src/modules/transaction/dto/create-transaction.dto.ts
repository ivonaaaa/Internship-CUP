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

export class CreateTransactionDto {
  @ApiProperty({
    description: 'The ID of the user associated with this transaction',
    example: 1,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Transaction amount',
    example: 49.99,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @ApiProperty({
    description: 'Transaction status',
    enum: TransactionStatus,
    example: TransactionStatus.SUCCESSFUL,
  })
  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @ApiProperty({
    description: 'Transaction date',
    example: new Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  transactionDate?: Date;
}
