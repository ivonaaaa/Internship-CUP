import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { BoatDto } from './dto/boat.dto';
import { CreateBoatDto } from './dto/create-boat.dto';
import { UpdateBoatDto } from './dto/update-boat.dto';
import { Boat } from '@prisma/client';

@Injectable()
export class BoatService {
  constructor(private prisma: PrismaService) {}

  private mapToResponseDto(rule: Boat): BoatDto {
    return {
      id: rule.id,
      userId: rule.userId,
      length: rule.length,
      width: rule.width,
      boatType: rule.boatType,
    };
  }

  async findAll(): Promise<BoatDto[]> {
    const boats = await this.prisma.boat.findMany({
      orderBy: { id: 'asc' },
    });
    return boats.map(this.mapToResponseDto);
  }

  async findOne(id: number): Promise<BoatDto> {
    const boat = await this.prisma.boat.findUnique({
      where: { id },
    });
    if (!boat) throw new NotFoundException(`Boat with ID ${id} not found`);

    return this.mapToResponseDto(boat);
  }

  async findAllByUser(userId: number): Promise<BoatDto[]> {
    const boatByUser = await this.prisma.boat.findMany({
      where: { userId },
    });
    if (!boatByUser)
      throw new NotFoundException(`No boats found for user ID ${userId}`);

    return boatByUser.map(this.mapToResponseDto);
  }

  async create(createBoatDto: CreateBoatDto): Promise<BoatDto> {
    const boat = await this.prisma.boat.create({
      data: createBoatDto,
    });

    return this.mapToResponseDto(boat);
  }

  async update(id: number, updateBoatDto: UpdateBoatDto): Promise<BoatDto> {
    await this.findOne(id);

    const updatedBoat = await this.prisma.boat.update({
      where: { id },
      data: updateBoatDto,
    });

    return this.mapToResponseDto(updatedBoat);
  }

  async remove(id: number): Promise<BoatDto> {
    const boat = await this.findOne(id);
    if (!boat) throw new NotFoundException(`Boat with ID ${id} not found`);

    const deletedBoat = await this.prisma.boat.delete({
      where: { id },
    });

    return this.mapToResponseDto(deletedBoat);
  }
}
