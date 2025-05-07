import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { MapElementDto } from './dto/map-element.dto';
import { CreateMapElementDto } from './dto/create-map-element.dto';
import { UpdateMapElementDto } from './dto/update-map-element.dto';
import { MapElement } from '@prisma/client';

@Injectable()
export class MapElementService {
  constructor(private prisma: PrismaService) {}

  private mapToResponseDto(mapElement: MapElement): MapElementDto {
    return {
      id: mapElement.id,
      ruleId: mapElement.ruleId,
      name: mapElement.name,
      type: mapElement.type,
      fillColor: mapElement.fillColor,
      coordinates: mapElement.coordinates,
      description: mapElement.description,
      isActive: mapElement.isActive,
    };
  }

  async findAll(): Promise<MapElementDto[]> {
    const mapElements = await this.prisma.mapElement.findMany({
      orderBy: { id: 'asc' },
    });

    return mapElements.map(this.mapToResponseDto);
  }

  async findOne(id: number): Promise<MapElementDto> {
    const mapElement = await this.prisma.mapElement.findUnique({
      where: { id },
    });

    if (!mapElement) {
      throw new NotFoundException(`Map Element with ID ${id} not found`);
    }

    return this.mapToResponseDto(mapElement);
  }

  async findByRuleId(ruleId: number): Promise<MapElementDto[]> {
    const ruleExists = await this.prisma.rule.findUnique({
      where: { id: ruleId },
    });

    if (!ruleExists) {
      throw new NotFoundException(`Rule with ID ${ruleId} not found`);
    }

    const mapElements = await this.prisma.mapElement.findMany({
      where: { ruleId },
      orderBy: { id: 'asc' },
    });

    return mapElements.map(this.mapToResponseDto);
  }

  async create(
    createMapElementDto: CreateMapElementDto,
  ): Promise<MapElementDto> {
    const ruleExists = await this.prisma.rule.findUnique({
      where: { id: createMapElementDto.ruleId },
    });

    if (!ruleExists) {
      throw new NotFoundException(
        `Rule with ID ${createMapElementDto.ruleId} not found`,
      );
    }

    const mapElement = await this.prisma.mapElement.create({
      data: createMapElementDto,
    });

    return this.mapToResponseDto(mapElement);
  }

  async update(
    id: number,
    updateMapElementDto: UpdateMapElementDto,
  ): Promise<MapElementDto> {
    await this.findOne(id);

    if (updateMapElementDto.ruleId !== undefined) {
      const ruleExists = await this.prisma.rule.findUnique({
        where: { id: updateMapElementDto.ruleId },
      });

      if (!ruleExists) {
        throw new NotFoundException(
          `Rule with ID ${updateMapElementDto.ruleId} not found`,
        );
      }
    }

    const updatedMapElement = await this.prisma.mapElement.update({
      where: { id },
      data: updateMapElementDto,
    });

    return this.mapToResponseDto(updatedMapElement);
  }

  async remove(id: number): Promise<MapElementDto> {
    await this.findOne(id);

    const deletedMapElement = await this.prisma.mapElement.delete({
      where: { id },
    });

    return this.mapToResponseDto(deletedMapElement);
  }
}
