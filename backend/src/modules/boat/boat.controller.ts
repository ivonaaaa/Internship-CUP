import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { BoatService } from './boat.service';
import { CreateBoatDto } from './dto/create-boat.dto';
import { UpdateBoatDto } from './dto/update-boat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Boat } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('boats')
@Controller('boats')
@UseGuards(JwtAuthGuard)
export class BoatController {
  constructor(private readonly boatsService: BoatService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all boats' })
  @ApiResponse({
    status: 200,
    description: 'List of all boats',
  })
  async findAll(): Promise<Boat[]> {
    return this.boatsService.findAll();
  }

  @Get('allByUser')
  @ApiOperation({ summary: 'Get all boats for a specific user' })
  @ApiResponse({
    status: 200,
    description: 'List of boats for the user',
  })
  async findAllByUser(@Request() req): Promise<Boat[]> {
    return this.boatsService.findAllByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a boat by ID' })
  @ApiResponse({
    status: 200,
    description: 'Boat found',
  })
  @ApiResponse({
    status: 404,
    description: 'Boat not found',
  })
  async findOne(@Param('id') id: string): Promise<Boat> {
    return this.boatsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new boat' })
  @ApiResponse({
    status: 201,
    description: 'Boat successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data',
  })
  async create(
    @Body() createBoatDto: CreateBoatDto,
    @Request() req,
  ): Promise<Boat> {
    createBoatDto.userId = req.user.id;
    return this.boatsService.create(createBoatDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a boat by ID' })
  @ApiResponse({
    status: 200,
    description: 'Boat successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Boat not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateBoatDto: UpdateBoatDto,
  ): Promise<Boat> {
    return this.boatsService.update(+id, updateBoatDto);
  }
}
