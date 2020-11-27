import {IsString,IsNotEmpty, IsEnum, IsOptional, IsMongoId} from "class-validator";
import {statusEnum} from "../../enums/status.enum";

export class CreateTaskDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    @IsMongoId()
    readonly project: string;
    @IsString()
    @IsOptional()
    @IsEnum(statusEnum)
    readonly status: statusEnum;
    @IsString()
    @IsNotEmpty()
    readonly comment: string;
}