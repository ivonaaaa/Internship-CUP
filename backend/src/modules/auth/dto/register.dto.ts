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
    description: 'User name',
    example: 'John',
  })
  name: string;

  @ApiProperty({
    description: 'User surname',
    example: 'Doe',
  })
  surname: string;

  @ApiProperty({
    description: 'Password must have at least 8 characters',
    example: 'strongpassword123',
  })
  password: string;

  @ApiProperty({
    description: 'Chosen subscription plan',
    enum: SubscriptionPlan,
    example: SubscriptionPlan.FREE_TRIAL,
    required: false,
  })
  subscriptionPlan?: SubscriptionPlan;
}
