import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
  HttpStatus,
} from '@nestjs/common';
import { BoatService } from './boat.service';
import { CreateBoatDto } from './dto/create-boat.dto';
import { UpdateBoatDto } from './dto/update-boat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Boat } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('boats')
@Controller('boats')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BoatController {
  constructor(private readonly boatsService: BoatService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all boats' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all boats',
  })
  async findAll(): Promise<Boat[]> {
    return this.boatsService.findAll();
  }

  @Get('allByUser')
  @ApiOperation({ summary: 'Get all boats for a specific user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of boats for the user',
  })
  async findAllByUser(@Request() req): Promise<Boat[]> {
    return this.boatsService.findAllByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a boat by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Boat found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Boat not found',
  })
  async findOne(@Param('id') id: string): Promise<Boat> {
    return this.boatsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new boat' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Boat successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request, invalid data',
  })
  async create(
    @Body() createBoatDto: CreateBoatDto,
    @Request() req,
  ): Promise<Boat> {
    createBoatDto.userId = req.user.id;
    return this.boatsService.create(createBoatDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a boat by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Boat successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Boat not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateBoatDto: UpdateBoatDto,
  ): Promise<Boat> {
    return this.boatsService.update(+id, updateBoatDto);
  }
}
