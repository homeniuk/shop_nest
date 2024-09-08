import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BasketService {
  constructor(private prisma: PrismaService) {}

  async findByUser(id: number){
    const list = await this.prisma.basket.findMany(
      {
        where: {userId: id},
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              catalog: true,
              imageSmall: true,
              price: true,
            },
          },
        },
        orderBy: [{
      	   id: 'desc',
    	}]
      }
    );
  return {list}
  }
  
  async create(userId:number, createBasketDto: CreateBasketDto ){
    const productId = createBasketDto.productId;
    const existPosition = await this.prisma.basket.findMany({where: {userId, productId: productId}});
    if (!(existPosition.length === 0))
      throw new NotFoundException('Position is already in basket');

    await this.prisma.basket.create({
      data: {
        user: { connect: { id: userId } },
        product: { connect: { id: createBasketDto.productId } },
        quantity: createBasketDto.quantity
      },
    });
    
    return this.findByUser(userId);
  }

  async update(userId:number, updateBasketDto: UpdateBasketDto) {
    const productId = updateBasketDto.productId;
    const existPosition = await this.prisma.basket.findMany({where: {userId, productId: productId}});
    if (existPosition.length === 0)
      throw new NotFoundException('Position in basket not found');

    const id = existPosition[0].id;
    await this.prisma.basket.update({ where: { id }, data: updateBasketDto });
    return this.findByUser(userId);
  }

  async remove(userId:number, productId:number) {
    const existPosition = await this.prisma.basket.findMany({where: {userId, productId}});
    if (existPosition.length === 0)
      throw new NotFoundException('Position in basket not found');

    const id = existPosition[0].id;
    await this.prisma.basket.delete({ where: { id } });
    return this.findByUser(userId);
  }

  async clearBasket(userId:number) {
    await this.prisma.basket.deleteMany({ where: { userId } });
    return [];
  }

  findAll() {
    return this.prisma.basket.findMany();
  }

}
