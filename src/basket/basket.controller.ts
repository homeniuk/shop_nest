import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req, Request } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Get()
  findAll(@Req() req) {
    return this.basketService.findByUser(req.user.id);
  }

  @Post()
  create(@Req() req, @Body() createBasketDto: CreateBasketDto) {
    return this.basketService.create(req.user.id, createBasketDto);
  }
  
  @Patch()
  update(@Req() req, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(req.user.id, updateBasketDto);
  }
  
  @Delete(':id')
  remove(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.basketService.remove(req.user.id, id);
  }

  @Delete('clear')
  clearBasket(@Req() req) {
    return this.basketService.clearBasket(req.user.id);
  }

}
