import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RuleDto } from './dto/rule.dto';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { Rule } from '@prisma/client';

@Injectable()
export class RuleService {
  constructor(private prisma: PrismaService) {}

  private mapToResponseDto(rule: Rule): RuleDto {
    return {
      id: rule.id,
      name: rule.name,
      type: rule.type,
      description: rule.description,
    };
  }

  async findAll(): Promise<RuleDto[]> {
    const rules = await this.prisma.rule.findMany({
      orderBy: { id: 'asc' },
    });

    return rules.map(this.mapToResponseDto);
  }

  async findOne(id: number): Promise<RuleDto> {
    const rule = await this.prisma.rule.findUnique({
      where: { id },
    });
    if (!rule) throw new NotFoundException(`Rule with ID ${id} not found`);

    return this.mapToResponseDto(rule);
  }

  async create(createRuleDto: CreateRuleDto): Promise<RuleDto> {
    const rule = await this.prisma.rule.create({
      data: createRuleDto,
    });

    return this.mapToResponseDto(rule);
  }

  async update(id: number, updateRuleDto: UpdateRuleDto): Promise<RuleDto> {
    await this.findOne(id);

    const updatedRule = await this.prisma.rule.update({
      where: { id },
      data: updateRuleDto,
    });

    return this.mapToResponseDto(updatedRule);
  }

  async remove(id: number): Promise<RuleDto> {
    await this.findOne(id);

    const mapElementsCount = await this.prisma.mapElement.count({
      where: { ruleId: id },
    });

    if (mapElementsCount > 0) {
      throw new Error(
        `Cannot delete rule with ID ${id} as it has associated map elements`,
      );
    }

    const notificationsCount = await this.prisma.notification.count({
      where: { ruleId: id },
    });

    if (notificationsCount > 0) {
      throw new Error(
        `Cannot delete rule with ID ${id} as it has associated notifications`,
      );
    }

    const deletedRule = await this.prisma.rule.delete({
      where: { id },
    });

    return this.mapToResponseDto(deletedRule);
  }
}
