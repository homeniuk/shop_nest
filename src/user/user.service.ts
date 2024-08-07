import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    });
  }

  async findAll() {
      return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({where: { id }});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existUser = await this.findOne(id);
    if (!existUser)
      throw new NotFoundException('User not found');

    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: number) {
    const existUser = await this.findOne(id);
    if (!existUser)
      throw new NotFoundException('User not found');

    return this.prisma.user.delete({ where: { id } });
  }
}
