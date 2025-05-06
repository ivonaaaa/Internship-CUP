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
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { BoatService } from './boat.service';
import { BoatDto } from './dto/boat.dto';
import { CreateBoatDto } from './dto/create-boat.dto';
import { UpdateBoatDto } from './dto/update-boat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('boats')
@Controller('boats')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BoatController {
  constructor(private readonly boatsService: BoatService) {}

  @Get()
  @ApiOperation({ summary: 'Get all boats' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all boats',
    type: [BoatDto],
  })
  async findAll(): Promise<BoatDto[]> {
    return this.boatsService.findAll();
  }

  @Get('allByUser')
  @ApiOperation({ summary: 'Get all boats for a specific user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of boats for the user',
    type: [BoatDto],
  })
  async findAllByUser(@Request() req): Promise<BoatDto[]> {
    return this.boatsService.findAllByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a boat by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Boat found',
    type: [BoatDto],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Boat not found',
  })
  async findOne(@Param('id') id: string): Promise<BoatDto> {
    return this.boatsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new boat' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Boat successfully created',
    type: [BoatDto],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request, invalid data',
  })
  async create(
    @Body() createBoatDto: CreateBoatDto,
    @Request() req,
  ): Promise<BoatDto> {
    createBoatDto.userId = req.user.id;
    return this.boatsService.create(createBoatDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a boat by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Boat successfully updated',
    type: [BoatDto],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Boat not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateBoatDto: UpdateBoatDto,
  ): Promise<BoatDto> {
    return this.boatsService.update(+id, updateBoatDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a boat' })
  @ApiParam({ name: 'id', description: 'The ID of the boat to delete' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Boat has been successfully deleted',
    type: [BoatDto],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Boat not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<BoatDto> {
    return this.boatsService.remove(id);
  }
}
