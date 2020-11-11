import {IsString, IsDateString, IsEmail} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsString()
    readonly email: string;
    @IsString()
    readonly password: string;
    readonly role: string;
}