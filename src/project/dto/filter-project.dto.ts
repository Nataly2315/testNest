
import {statusEnum} from "../../enums/status.enum";

export class ProjectFilterDto {
    author?: string;
    responsible?: string;
    title?: string;
    description?: string;
    project?: string;
    status?: statusEnum;
    page?: number;
    pageSize?: number;
}