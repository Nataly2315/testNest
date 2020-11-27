import {roleEnum} from "../../enums/role.enum";
import {ObjectIdDTO} from "../../user/dto/object-id.dto";


export interface Payload {
    readonly id: ObjectIdDTO;
    readonly email: string;
    readonly roles: roleEnum[];
}