import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Notification[]> {
    return this.prisma.notification.findMany();
  }

  async findOne(id: number): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification)
      throw new NotFoundException(`Notification with ID ${id} not found`);

    return notification;
  }

  async findByUserId(userId: number): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: { userId },
    });
  }

  async findByBoatId(boatId: number): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: { boatId },
    });
  }

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return this.prisma.notification.create({
      data: {
        userId: createNotificationDto.userId,
        boatId: createNotificationDto.boatId,
        mapElementId: createNotificationDto.mapElementId,
        ruleId: createNotificationDto.ruleId,
        locationCoordinates: createNotificationDto.locationCoordinates,
      },
    });
  }

  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification)
      throw new NotFoundException(`Notification with ID ${id} not found`);

    return this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
    });
  }

  async remove(id: number): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification)
      throw new NotFoundException(`Notification with ID ${id} not found`);

    return this.prisma.notification.delete({
      where: { id },
    });
  }
}
