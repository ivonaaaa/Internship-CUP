import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TransactionDto } from './dto/transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  private mapToResponseDto(transaction: Transaction): TransactionDto {
    return {
      id: transaction.id,
      userId: transaction.userId,
      amount: Number(transaction.amount),
      status: transaction.status,
      transactionDate: transaction.transactionDate,
    };
  }

  async findAll(): Promise<TransactionDto[]> {
    const transactions = await this.prisma.transaction.findMany({
      orderBy: { transactionDate: 'desc' },
    });

    return transactions.map(this.mapToResponseDto);
  }

  async findOne(id: number): Promise<TransactionDto> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction)
      throw new NotFoundException(`Transaction with ID ${id} not found`);

    return this.mapToResponseDto(transaction);
  }

  async findByUserId(userId: number): Promise<TransactionDto[]> {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists)
      throw new NotFoundException(`User with ID ${userId} not found`);

    const transactions = await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { transactionDate: 'desc' },
    });

    return transactions.map(this.mapToResponseDto);
  }

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionDto> {
    const userExists = await this.prisma.user.findUnique({
      where: { id: createTransactionDto.userId },
    });

    if (!userExists) {
      throw new NotFoundException(
        `User with ID ${createTransactionDto.userId} not found`,
      );
    }

    const transaction = await this.prisma.transaction.create({
      data: createTransactionDto,
    });

    return this.mapToResponseDto(transaction);
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<TransactionDto> {
    await this.findOne(id);

    const updatedTransaction = await this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });

    return this.mapToResponseDto(updatedTransaction);
  }

  async remove(id: number): Promise<TransactionDto> {
    await this.findOne(id);

    const deletedTransaction = await this.prisma.transaction.delete({
      where: { id },
    });

    return this.mapToResponseDto(deletedTransaction);
  }
}
