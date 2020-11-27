import {statusEnum} from "../../enums/status.enum";

export class TaskFilterDto {
    author?: string;
    executor?: string;
    title?: string;
    description?: string;
    project?: string;
    status?: statusEnum;
    page?: number ;
    pageSize?: number;
}