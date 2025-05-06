import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved all transactions',
  })
  async findAll(): Promise<TransactionDto[]> {
    return this.transactionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transaction by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the transaction' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved the transaction',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transaction not found',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TransactionDto> {
    return this.transactionService.findOne(id);
  }

  @Get('by-user/:userId')
  @ApiOperation({ summary: 'Get all transactions for a specific user' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved all transactions for the specified user',
  })
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<TransactionDto[]> {
    return this.transactionService.findByUserId(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The transaction has been successfully created.',
  })
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionDto> {
    return this.transactionService.create(createTransactionDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transaction' })
  @ApiParam({ name: 'id', description: 'The ID of the transaction to update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The transaction has been successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transaction not found',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<TransactionDto> {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiParam({ name: 'id', description: 'The ID of the transaction to delete' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The transaction has been successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transaction not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<TransactionDto> {
    return this.transactionService.remove(id);
  }
}
