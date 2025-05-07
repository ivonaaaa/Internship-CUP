import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { MapElementDto } from './dto/map-element.dto';
import { CreateMapElementDto } from './dto/create-map-element.dto';
import { UpdateMapElementDto } from './dto/update-map-element.dto';

@Injectable()
export class MapElementService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<MapElementDto[]> {
    const mapElements = await this.prisma.mapElement.findMany({
      include: {
        rule: {
          select: {
            id: true,
            name: true,
            description: true,
            type: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    return mapElements.map((element) => ({
      ...element,
      fillOpacity: Number(element.fillOpacity),
      lineWidth: Number(element.lineWidth),
    }));
  }

  async findOne(id: number): Promise<MapElementDto> {
    const mapElement = await this.prisma.mapElement.findUnique({
      where: { id },
    });

    if (!mapElement) {
      throw new NotFoundException(`Map Element with ID ${id} not found`);
    }

    return {
      ...mapElement,
      fillOpacity: Number(mapElement.fillOpacity),
      lineWidth: Number(mapElement.lineWidth),
    };
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

    return mapElements.map((element) => ({
      ...element,
      fillOpacity: Number(element.fillOpacity),
      lineWidth: Number(element.lineWidth),
    }));
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

    return {
      ...mapElement,
      fillOpacity: Number(mapElement.fillOpacity),
      lineWidth: Number(mapElement.lineWidth),
    };
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

    return {
      ...updatedMapElement,
      fillOpacity: Number(updatedMapElement.fillOpacity),
      lineWidth: Number(updatedMapElement.lineWidth),
    };
  }

  async remove(id: number): Promise<MapElementDto> {
    await this.findOne(id);

    const deletedMapElement = await this.prisma.mapElement.delete({
      where: { id },
    });

    return {
      ...deletedMapElement,
      fillOpacity: Number(deletedMapElement.fillOpacity),
      lineWidth: Number(deletedMapElement.lineWidth),
    };
  }
}
