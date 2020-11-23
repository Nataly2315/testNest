import {IsString, IsDateString, IsEmail, IsNotEmpty, IsIn, IsEnum, IsOptional} from "class-validator";
import {statusEnum} from "../enums/status.enum";

export class CreateTaskDTO {
    readonly author: string;
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    readonly executor: string;
    @IsString()
    @IsOptional()
    @IsEnum(statusEnum)
    readonly status: statusEnum;
    @IsString()
    @IsNotEmpty()
    readonly comment: string;
}