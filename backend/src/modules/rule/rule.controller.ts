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
import { RuleService } from './rule.service';
import { RuleDto } from './dto/rule.dto';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('rules')
@Controller('rules')
@UseGuards(JwtAuthGuard)
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all rules' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved all rules',
    type: [RuleDto],
  })
  async findAll(): Promise<RuleDto[]> {
    return this.ruleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rule by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the rule' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved the rule',
    type: RuleDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rule not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RuleDto> {
    return this.ruleService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new rule' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The rule has been successfully created.',
    type: RuleDto,
  })
  async create(@Body() createRuleDto: CreateRuleDto): Promise<RuleDto> {
    return this.ruleService.create(createRuleDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a rule' })
  @ApiParam({ name: 'id', description: 'The ID of the rule to update' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The rule has been successfully updated',
    type: RuleDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rule not found',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRuleDto: UpdateRuleDto,
  ): Promise<RuleDto> {
    return this.ruleService.update(id, updateRuleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a rule' })
  @ApiParam({ name: 'id', description: 'The ID of the rule to delete' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The rule has been successfully deleted',
    type: RuleDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rule not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<RuleDto> {
    return this.ruleService.remove(id);
  }
}
