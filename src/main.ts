import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  /*app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });*/
  app.enableCors({
  origin: [
    'http://localhost:3000',
    'http://example.com',
   ],
   methods: ["GET", "POST", "PATCH", "DELETE"],
   credentials: true,
  });

  //app.useGlobalGuards(new AuthGuard());
  await app.listen(5000);
}
bootstrap();
