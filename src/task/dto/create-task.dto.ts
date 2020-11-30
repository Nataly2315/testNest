import {IsString, IsNotEmpty, IsEnum, IsOptional, IsMongoId} from "class-validator";
import {ApiProperty} from '@nestjs/swagger';
import {statusEnum} from "../../enums/status.enum";

export class CreateTaskDTO {
    @ApiProperty({
        description: 'The title of the task',
    })
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @ApiProperty({
        description: 'Full description of the task'
    })
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    @ApiProperty({
        description: 'Reference to parent project'
    })
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    readonly project: string;
    @ApiProperty({
        description: 'Status value',
        enum: statusEnum,
        default: statusEnum.new
    })
    @IsString()
    @IsOptional()
    @IsEnum(statusEnum)
    readonly status: statusEnum;
    @ApiProperty({
        description: 'Another task data',
    })
    @IsString()
    readonly comment: string;
}