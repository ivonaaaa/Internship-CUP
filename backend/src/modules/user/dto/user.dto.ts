import { Exclude } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @Exclude()
  passwordHash: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  subscriptionPlan?: string;

  @ApiProperty()
  subscriptionExpiry: Date;
}
