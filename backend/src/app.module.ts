import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [], //ode idu svi moduli kasnije
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
