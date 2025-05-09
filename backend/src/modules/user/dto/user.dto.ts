import { Exclude } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @Exclude()
  passwordHash: string;

  @ApiProperty({ example: 'FREE_TRIAL' })
  subscriptionPlan?: string;

  @ApiProperty({ example: '2025-05-10T00:00:00Z' })
  subscriptionExpiry: Date;
}
