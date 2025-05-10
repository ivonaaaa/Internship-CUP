import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Bay Obey API')
    .setDescription('The API for the Internship CUP project')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('bayobey')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: ['http://localhost:5173', 'http://192.168.1.6:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
