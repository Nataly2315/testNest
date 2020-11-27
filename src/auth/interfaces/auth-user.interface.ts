import {roleEnum} from "../../enums/role.enum";


export interface AuthUser {
    readonly _id: string;
    readonly email: string;
    readonly roles: roleEnum[];
}