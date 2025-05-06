import { ApiProperty } from '@nestjs/swagger';
import { RuleType } from '@prisma/client';

export class RuleDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'No Fishing' })
  name: string;

  @ApiProperty({ enum: RuleType, example: RuleType.ENVIRONMENTAL_PROTECTION })
  type: RuleType;

  @ApiProperty({ example: 'Protection of marine wildlife in this area' })
  description: string;
}
