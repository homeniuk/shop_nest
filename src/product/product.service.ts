import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  
  async findAll() {
    return this.prisma.product.findMany();;
  }
  async findOne(id: number) {
    return this.prisma.product.findUnique({where: { id }});
  }
  async findByCatalog(catalog: string) {
    const goodsList = await this.prisma.product.findMany({where: { catalog }});
    return {goodsList};
  }

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const existProduct = await this.findOne(id);
    if (!existProduct)
      throw new NotFoundException('Product not found');

    return this.prisma.product.update({ where: { id }, data: updateProductDto });
  }

  async remove(id: number) {
    const existProduct = await this.findOne(id);
    if (!existProduct)
      throw new NotFoundException('Product not found');

    return this.prisma.product.delete({ where: { id } });
  }
}
