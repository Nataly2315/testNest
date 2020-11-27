import { SetMetadata } from '@nestjs/common';
import {roleEnum} from "../../enums/role.enum";

export const Roles = (...roles: roleEnum[]) => SetMetadata('roles', roles);