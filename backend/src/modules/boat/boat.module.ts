import { Module } from '@nestjs/common';
import { BoatService } from './boat.service';
import { BoatController } from './boat.controller';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  controllers: [BoatController],
  providers: [BoatService, PrismaService],
  exports: [BoatService],
})
export class BoatModule {}
