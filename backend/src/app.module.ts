import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoatModule } from './modules/boat/boat.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MapElementModule } from './modules/map-element/map-element.module';
import { RuleModule } from './modules/rule/rule.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BoatModule,
    MapElementModule,
    NotificationModule,
    RuleModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
