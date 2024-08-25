import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({isGlobal: true,}), ProductModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
