import {IsString, IsEmail, Matches, MinLength, IsNotEmpty} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain:  at least 1 upper case letter, at least 1 lower case letter, at least 1 number or special character'
    })
    readonly password: string;
}