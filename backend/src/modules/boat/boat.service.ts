import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { BoatDto } from './dto/boat.dto';
import { CreateBoatDto } from './dto/create-boat.dto';
import { UpdateBoatDto } from './dto/update-boat.dto';
import { Boat, Prisma } from '@prisma/client';

@Injectable()
export class BoatService {
  constructor(private prisma: PrismaService) {}

  private async validateUniqueRegistration(
    registration: string,
    excludeBoatId?: number,
  ): Promise<void> {
    const query: Prisma.BoatWhereInput = {
      registration,
    };

    if (excludeBoatId) {
      query.NOT = { id: excludeBoatId };
    }

    const existingBoat = await this.prisma.boat.findFirst({
      where: query,
    });

    if (existingBoat) {
      throw new ConflictException(
        `Boat with registration ${registration} already exists`,
      );
    }
  }

  private mapToResponseDto(boat: Boat): BoatDto {
    return {
      id: boat.id,
      userId: boat.userId,
      name: boat.name,
      registration: boat.registration,
      length: boat.length,
      width: boat.width,
      boatType: boat.boatType,
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

  async findAllByUser(id: number): Promise<BoatDto[]> {
    const boatByUser = await this.prisma.boat.findMany({
      where: { userId: id },
    });

    if (!boatByUser) return [];

    return boatByUser.map(this.mapToResponseDto);
  }

  async create(createBoatDto: CreateBoatDto): Promise<BoatDto> {
    await this.validateUniqueRegistration(createBoatDto.registration);

    const boat = await this.prisma.boat.create({
      data: createBoatDto,
    });

    return this.mapToResponseDto(boat);
  }

  async update(id: number, updateBoatDto: UpdateBoatDto): Promise<BoatDto> {
    if (updateBoatDto.registration)
      await this.validateUniqueRegistration(updateBoatDto.registration, id);

    const existingBoat = await this.prisma.boat.findUnique({
      where: { id },
    });
    if (!existingBoat)
      throw new NotFoundException(`Boat with ID ${id} not found`);

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
