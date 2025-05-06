import { ApiProperty } from '@nestjs/swagger';
import { TransactionStatus } from '@prisma/client';

export class TransactionDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 49.99 })
  amount: number;

  @ApiProperty({
    enum: TransactionStatus,
    example: TransactionStatus.SUCCESSFUL,
  })
  status: TransactionStatus;

  @ApiProperty({ example: new Date() })
  transactionDate: Date;
}
