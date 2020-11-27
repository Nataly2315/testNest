import {roleEnum} from "../../enums/role.enum";
import {IsNotEmpty} from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    roles: roleEnum[];
}