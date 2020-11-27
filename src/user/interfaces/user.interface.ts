import {Document} from 'mongoose';
import {roleEnum} from "../../enums/role.enum";

export interface User extends Document {
    readonly _id: string;
    readonly email: string;
    password?: string;
    roles: roleEnum[];
}