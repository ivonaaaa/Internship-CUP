import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { SubscriptionPlan } from '@prisma/client';

export class RegisterDto extends CreateUserDto {
  @ApiProperty({
    description: 'User email address must contain a valid format',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description:
      'User username can only contain lowercase letters, numbers, and underscores',
    example: 'john_doe',
  })
  username: string;

  @ApiProperty({
    description: 'Password must have at least 8 characters',
    example: 'strongpassword123',
  })
  password: string;

  @ApiProperty({
    description:
      'User phone number must be in the format +[country code][number]',
    example: '+385912345678',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Chosen subscription plan',
    enum: SubscriptionPlan,
    example: SubscriptionPlan.FREE_TRIAL,
    required: false,
  })
  subscriptionPlan?: SubscriptionPlan;
}
