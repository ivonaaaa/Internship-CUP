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
import { MapElementService } from './map-element.service';
import { MapElementDto } from './dto/map-element.dto';
import { CreateMapElementDto } from './dto/create-map-element.dto';
import { UpdateMapElementDto } from './dto/update-map-element.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('map-elements')
@Controller('map-elements')
@UseGuards(JwtAuthGuard)
export class MapElementController {
  constructor(private readonly mapElementService: MapElementService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all map elements' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved all map elements',
    type: [MapElementDto],
  })
  async findAll(): Promise<MapElementDto[]> {
    return this.mapElementService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a map element by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the map element' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved the map element',
    type: MapElementDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Map element not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<MapElementDto> {
    return this.mapElementService.findOne(id);
  }

  @Get('by-rule/:ruleId')
  @ApiOperation({
    summary: 'Get all map elements associated with a specific rule',
  })
  @ApiParam({ name: 'ruleId', description: 'The ID of the rule' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved all map elements for the specified rule',
    type: [MapElementDto],
  })
  async findByRuleId(
    @Param('ruleId', ParseIntPipe) ruleId: number,
  ): Promise<MapElementDto[]> {
    return this.mapElementService.findByRuleId(ruleId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new map element' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The map element has been successfully created.',
    type: MapElementDto,
  })
  async create(
    @Body() createMapElementDto: CreateMapElementDto,
  ): Promise<MapElementDto> {
    return this.mapElementService.create(createMapElementDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a map element' })
  @ApiParam({ name: 'id', description: 'The ID of the map element to update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The map element has been successfully updated',
    type: MapElementDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Map element not found',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMapElementDto: UpdateMapElementDto,
  ): Promise<MapElementDto> {
    return this.mapElementService.update(id, updateMapElementDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a map element' })
  @ApiParam({ name: 'id', description: 'The ID of the map element to delete' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The map element has been successfully deleted',
    type: MapElementDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Map element not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<MapElementDto> {
    return this.mapElementService.remove(id);
  }
}
