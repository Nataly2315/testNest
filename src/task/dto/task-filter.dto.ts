import {statusEnum} from "../../enums/status.enum";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {Max} from "class-validator";

export class TaskFilterDto {
    @ApiModelProperty({
        description: "Author Mongodb Id",
        required: false,
    })
    author?: string;
    @ApiModelProperty({
        description: "Executor Mongodb Id",
        required: false,
    })
    executor?: string;
    @ApiModelProperty({
        description: "Title for search",
        required: false,
    })
    title?: string;
    description?: string;
    @ApiModelProperty({
        description: "Project Mongodb Id",
        required: false,
    })
    project?: string;
    @ApiModelProperty({
        description: "Status value",
        required: false,
        enum: [statusEnum]
    })
    status?: statusEnum;
    @ApiModelProperty({
        description: "Current page value",
        required: false,
        default: 1
    })
    page?: number ;
    @ApiModelProperty({
        description: "Amount of tasks per page",
        required: false,
        default: 100,
        maximum: 100
    })
    pageSize?: number;
}