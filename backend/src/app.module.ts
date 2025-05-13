import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'frontend', 'dist'),
      exclude: ['/api*'],
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
})
export class AppModule {}
