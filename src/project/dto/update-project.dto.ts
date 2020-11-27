import {IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {statusEnum} from "../../enums/status.enum";

export class UpdateProjectDto {
    @IsString()
    @IsNotEmpty()
    title?: string;
    @IsMongoId()
    responsible?: string;
    @IsString()
    @IsNotEmpty()
    description?: string;
    @IsString()
    @IsOptional()
    @IsEnum(statusEnum)
    status?: statusEnum;
    @IsString()
    @IsNotEmpty()
    comment?: string;
    @IsDateString()
    dueDate?: Date
}
