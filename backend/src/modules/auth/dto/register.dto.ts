import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User username',
    example: 'john_doe',
  })
  username: string;

  @ApiProperty({
    description: 'User password',
    example: 'strongpassword123',
  })
  password: string;
}
