import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from '@nestjs/class-validator';
import { SubscriptionPlan } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Matches(/^[^@]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}$/)
  email: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    description: 'Password for the user, must be at least 8 characters long',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Subscription plan of the user',
    enum: SubscriptionPlan,
    example: SubscriptionPlan.PAID,
    required: false,
  })
  @IsEnum(SubscriptionPlan)
  subscriptionPlan?: SubscriptionPlan;
}