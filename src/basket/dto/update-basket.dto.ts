import { PartialType } from '@nestjs/mapped-types';
import { CreateBasketDto } from './create-basket.dto';
import { IsNumber } from "class-validator";

export class UpdateBasketDto extends PartialType(CreateBasketDto) {
  
    @IsNumber()
    productId:       number;
    
    @IsNumber()
    quantity:        number;
}
