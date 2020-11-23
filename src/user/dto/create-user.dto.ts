import {IsString, IsDateString, IsEmail, Matches} from "class-validator";
import {roleEnum} from "../enums/role.enum";

export class CreateUserDto {
    @IsEmail()
    @IsString()
    readonly email: string;
    @IsString()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain:  at least 1 upper case letter, at least 1 lower case letter, at least 1 number or special character'
    })
    readonly password: string;
    readonly roles: roleEnum[];
}