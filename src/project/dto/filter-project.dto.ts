
import {statusEnum} from "../../enums/status.enum";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class ProjectFilterDto {
    @ApiModelProperty({
        description: "Author Mongodb Id",
        required: false,
    })
    @ApiModelProperty({
        description: "Responsible user Mongodb Id",
        required: false,
    })
    responsible?: string;
    @ApiModelProperty({
        description: "Title for search",
        required: false,
    })
    title?: string;
    description?: string;
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
    page?: number;
    @ApiModelProperty({
        description: "Amount of projects per page",
        required: false,
        default: 100,
        maximum: 100
    })
    pageSize?: number;
}