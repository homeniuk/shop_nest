import { IsEmail, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    login: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}