import { Module } from '@nestjs/common';
import { MapElementController } from './map-element.controller';
import { MapElementService } from './map-element.service';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MapElementController],
  providers: [MapElementService],
  exports: [MapElementService],
})
export class MapElementModule {}
