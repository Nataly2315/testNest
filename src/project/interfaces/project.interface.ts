import {statusEnum} from "../../enums/status.enum";
import {Task} from "../../task/interfaces/task.interface";

export interface Project extends Document {
    readonly _id: string;
    readonly author: string;
    title: string;
    responsible: string;
    description: string;
    status: statusEnum;
    comment: string;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}