import { BoatType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class BoatDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;


  @ApiProperty({ example: 10.5 })
  length: number;

  @ApiProperty({ example: 3.2 })
  width: number;

  @ApiProperty({ enum: BoatType, example: BoatType.MOTORBOAT, required: false })
  boatType?: BoatType;
}
