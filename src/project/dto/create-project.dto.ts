import {statusEnum} from "../../enums/status.enum";
import {IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, Validate} from "class-validator";
import {IsMinDateToday} from "../decorators/date-validate.decorator"
import {ApiProperty} from "@nestjs/swagger";

export class CreateProjectDto {

    @ApiProperty({
        description: 'The title of the project',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Reference to responsible user'
    })
    @IsMongoId()
    responsible: string;

    @ApiProperty({
        description: 'Full description of the project'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Status value',
        enum: statusEnum,
        default: statusEnum.new
    })
    @IsString()
    @IsOptional()
    @IsEnum(statusEnum)
    status: statusEnum;

    @IsString()
    @IsNotEmpty()
    comment: string;

    @ApiProperty({
        description: 'Date string',
    })
    @IsDateString()
    @Validate(IsMinDateToday,{message: "dueDate should not be in the past"})
    dueDate: Date
}
