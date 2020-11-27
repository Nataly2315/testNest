import {IsString, IsEmail, MinLength, IsNotEmpty} from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string
}