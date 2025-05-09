import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private mapToResponseDto(user: User): UserDto {
    const {
      id,
      email,
      name,
      surname,
      passwordHash,
      subscriptionPlan,
      subscriptionExpiry,
    } = user;
    return {
      id,
      email,
      name,
      surname,
      passwordHash,
      subscriptionPlan,
      subscriptionExpiry,
    };
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(this.mapToResponseDto);
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return this.mapToResponseDto(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { password, email, name, surname } = createUserDto;

    await this.ensureUniqueFields(email);

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        surname,
        passwordHash,
      },
    });

    return this.mapToResponseDto(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    await this.ensureUserExists(id);

    const { email, name, surname } = updateUserDto;

    await this.ensureUniqueFields(email, id);

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return this.mapToResponseDto(user);
  }

  async remove(id: number): Promise<UserDto> {
    await this.ensureUserExists(id);

    const user = await this.prisma.user.delete({
      where: { id },
    });

    return this.mapToResponseDto(user);
  }

  private async ensureUserExists(id: number): Promise<void> {
    const exists = await this.prisma.user.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`User with id ${id} not found`);
  }

  private async ensureUniqueFields(
    email: string,
    excludeUserId?: number,
  ): Promise<void> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        AND: [
          {
            OR: [{ email }],
          },
          excludeUserId ? { NOT: { id: excludeUserId } } : {},
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email already exists',
      );
    }
  }
}
