import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
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
    description: 'First name of the user',
    example: 'John',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiPropertyOptional({
    description: 'Password for the user, must be at least 8 characters long',
    example: 'password123',
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @ApiPropertyOptional({
    description: 'Subscription plan of the user',
    enum: SubscriptionPlan,
    example: SubscriptionPlan.PAID,
  })
  @IsOptional()
  @IsEnum(SubscriptionPlan)
  subscriptionPlan?: SubscriptionPlan;
}