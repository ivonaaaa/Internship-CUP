import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsString,
} from '@nestjs/class-validator';
import { SubscriptionPlan } from '@prisma/client';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Username for the user',
    example: 'john_doe_updated',
  })
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'Subscription plan of the user',
    enum: SubscriptionPlan,
    example: SubscriptionPlan.PAID,
  })
  @IsEnum(SubscriptionPlan)
  subscriptionPlan?: SubscriptionPlan;
}
