import {IsString, IsEmail, Matches} from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @IsEmail()
    readonly email: string
    @IsString()
    readonly password: string
}