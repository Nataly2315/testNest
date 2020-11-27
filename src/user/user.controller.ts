import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {UserService} from "./user.service";
import JwtAuthenticationGuard from "../auth/guards/jwt-authentification.guard";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ObjectIdDTO} from "./dto/object-id.dto";
import {roleEnum} from "../enums/role.enum";

@Controller('users')
@UseGuards(JwtAuthenticationGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class UserController {
    constructor(private userService: UserService) {

    }

    @Get('/')
    @Roles(roleEnum.admin)
    async getUsers() {
        return this.userService.getAllUsers();
    }

    @Get('/:userId')
    @Roles(roleEnum.admin)
    async getUser(@Param('userId') userID: ObjectIdDTO) {
        const user = this.userService.getUserById(userID);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        return user
    }

    @Put('/:userId')
    @Roles(roleEnum.admin)
    async updateUser(@Param('userId') userID: ObjectIdDTO, @Body() updateUserDto: UpdateUserDto) {
       const user = this.userService.updateUser(userID, updateUserDto);
        if (!user) {
            throw new NotFoundException('User does not exist!');
        }
        return user
    }

}
