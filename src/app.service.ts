import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
