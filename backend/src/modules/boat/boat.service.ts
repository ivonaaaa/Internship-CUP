import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateBoatDto } from './dto/create-boat.dto';
import { Boat } from '@prisma/client';
import { UpdateBoatDto } from './dto/update-boat.dto';

@Injectable()
export class BoatService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Boat[]> {
    return this.prisma.boat.findMany();
  }

  async findAllByUser(userId: number): Promise<Boat[]> {
    return this.prisma.boat.findMany({
      where: { userId },
    });
  }

  async findOne(id: number): Promise<Boat> {
    const boat = await this.prisma.boat.findUnique({
      where: { id },
    });
    if (!boat) throw new NotFoundException(`Boat with ID ${id} not found`);

    return boat;
  }

  async create(createBoatDto: CreateBoatDto): Promise<Boat> {
    return this.prisma.boat.create({
      data: createBoatDto,
    });
  }

  async update(id: number, updateBoatDto: UpdateBoatDto): Promise<Boat> {
    const existingBoat = await this.prisma.boat.findUnique({ where: { id } });
    if (!existingBoat) {
      throw new Error('Boat not found');
    }

    return this.prisma.boat.update({
      where: { id },
      data: updateBoatDto,
    });
  }
}
