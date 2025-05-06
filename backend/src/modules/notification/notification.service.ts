import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotificationDto } from './dto/notification.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  private mapToResponseDto(notification: Notification): NotificationDto {
    return {
      id: notification.id,
      userId: notification.userId,
      boatId: notification.boatId,
      mapElementId: notification.mapElementId,
      ruleId: notification.ruleId,
      timestamp: notification.timestamp,
      locationCoordinates: notification.locationCoordinates,
    };
  }

  async findAll(): Promise<NotificationDto[]> {
    const notifications = await this.prisma.notification.findMany({
      orderBy: { id: 'asc' },
    });
    return notifications.map(this.mapToResponseDto);
  }

  async findOne(id: number): Promise<NotificationDto> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification)
      throw new NotFoundException(`Notification with ID ${id} not found`);

    return this.mapToResponseDto(notification);
  }

  async findByUserId(userId: number): Promise<NotificationDto[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { userId },
    });

    return notifications.map(this.mapToResponseDto);
  }

  async findByBoatId(boatId: number): Promise<NotificationDto[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { boatId },
    });

    return notifications.map(this.mapToResponseDto);
  }

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationDto> {
    const notification = await this.prisma.notification.create({
      data: createNotificationDto,
    });

    return this.mapToResponseDto(notification);
  }

  async update(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<NotificationDto> {
    await this.findOne(id);

    const updated = await this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
    });

    return this.mapToResponseDto(updated);
  }

  async remove(id: number): Promise<NotificationDto> {
    await this.findOne(id);

    const deleted = await this.prisma.notification.delete({
      where: { id },
    });

    return this.mapToResponseDto(deleted);
  }
}
