import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  IsLowercase,
} from '@nestjs/class-validator';
import { SubscriptionPlan } from '@prisma/client';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsOptional()
  @IsEmail()
  @Matches(/^[^@]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}$/)
  email?: string;

  @ApiPropertyOptional({
    description: 'Username for the user',
    example: 'john_doe_updated',
  })
  @IsOptional()
  @IsString()
  @IsLowercase()
  @Matches(/^[a-z0-9_]+$/)
  username?: string;

  @ApiPropertyOptional({
    description: 'Password for the user, must be at least 8 characters long',
    example: 'password123',
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @ApiPropertyOptional({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @IsOptional()
  @Matches(/^\+(\d{1,4})\d{7,14}$/)
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'Subscription plan of the user',
    enum: SubscriptionPlan,
    example: SubscriptionPlan.PAID,
  })
  @IsOptional()
  @IsEnum(SubscriptionPlan)
  subscriptionPlan?: SubscriptionPlan;
}
