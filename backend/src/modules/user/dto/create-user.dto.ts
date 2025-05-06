import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsPhoneNumber,
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
    description: 'Username for the user',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  @Matches(/^[a-z0-9_]+$/)
  username: string;

  @ApiProperty({
    description: 'Password for the user, must be at least 8 characters long',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @IsNotEmpty()
  @Matches(/^\+(\d{1,4})\d{7,14}$/)
  phoneNumber: string;

  @ApiProperty({
    description: 'Subscription plan of the user',
    enum: SubscriptionPlan,
    example: SubscriptionPlan.PAID,
    required: false,
  })
  @IsEnum(SubscriptionPlan)
  subscriptionPlan?: SubscriptionPlan;
}
