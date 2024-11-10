import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors();
  /*app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });*/
  /*app.enableCors({
  origin: [
    'http://localhost:3000',
    'http://example.com',
   ],
   methods: ["GET", "POST", "PATCH", "DELETE"],
   credentials: true,
  });*/

  await app.listen(5000);
}
bootstrap();
