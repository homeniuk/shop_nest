import { IsNumber } from "class-validator";

export class CreateBasketDto {
    
    @IsNumber()
    productId:       number;
    
    @IsNumber()
    quantity:        number;
}