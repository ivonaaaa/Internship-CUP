import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dto/notification.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({
    status: 200,
    description: 'Return all notifications.',
    type: [NotificationDto],
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'Filter by user ID',
  })
  @ApiQuery({
    name: 'boatId',
    required: false,
    description: 'Filter by boat ID',
  })
  async findAll(
    @Query('userId') userId?: string,
    @Query('boatId') boatId?: string,
  ) {
    if (userId) return this.notificationService.findByUserId(+userId);
    if (boatId) return this.notificationService.findByBoatId(+boatId);

    return this.notificationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a notification by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the notification.',
    type: NotificationDto,
  })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({
    status: 201,
    description: 'The notification has been successfully created.',
    type: NotificationDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a notification' })
  @ApiResponse({
    status: 200,
    description: 'The notification has been successfully updated.',
    type: NotificationDto,
  })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiResponse({
    status: 200,
    description: 'The notification has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.remove(id);
  }
}
