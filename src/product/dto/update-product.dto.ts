import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    name:        string;

    @IsEmail()
    description: string;

    @IsString()
    image:       string;

    @IsString()
    imageSmall:  string;

    @IsString()
    catalog:     string;

    @IsNumber()
    price:       number;
}
