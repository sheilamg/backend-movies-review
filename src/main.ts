import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT, PATCH ,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, role',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )

  //Swagger
  const options = new DocumentBuilder()
    .setTitle('Proyecto Users y Autos')
    .setDescription('Users & Autos API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);

  fs.writeFileSync('swagger-config.json', JSON.stringify(document, null, 2));

  await app.listen(3002);
}
bootstrap();
