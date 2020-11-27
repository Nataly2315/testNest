import {statusEnum} from "../../enums/status.enum";
import {IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, MinDate, Validate} from "class-validator";
import {IsMinDateToday} from "../decorators/date-validate.decorator"

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsMongoId()
    responsible: string;
    @IsString()
    @IsNotEmpty()
    description: string;
    @IsString()
    @IsOptional()
    @IsEnum(statusEnum)
    status: statusEnum;
    @IsString()
    @IsNotEmpty()
    comment: string;
    @IsDateString()
    @Validate(IsMinDateToday,{message: "dueDate should not be in the past"})
    dueDate: Date
}
