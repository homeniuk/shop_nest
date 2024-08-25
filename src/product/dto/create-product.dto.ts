import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name:        string;

    @IsString()
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
