import {Controller, Get, Param, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserService} from "./user.service";
import JwtAuthenticationGuard from "../auth/jwt-authentification.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles.decorator";

@Controller('users')
@UseGuards(JwtAuthenticationGuard, RolesGuard)
export class UserController {
    constructor(private userService : UserService) {

    }

    @Get('/')
    @Roles('admin')
    async getUsers(){
     return  this.userService.getAllUsers();
    }

    @Get('/userId')
    @Roles('admin')
    async getUser(@Param('userID') userID: string){
        return  this.userService.getUserById(userID);
    }


}
