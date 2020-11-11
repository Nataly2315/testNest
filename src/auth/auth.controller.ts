import {
    Controller,
    Post,
    UseGuards,
    Body,
    Request,
    Get,
    InternalServerErrorException, UsePipes, ValidationPipe
} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import { ExtractJwt } from 'passport-jwt';
import JwtAuthenticationGuard from "./jwt-authentification.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/login')
    async login(@Body() authCredentials: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.login(authCredentials);
    }

    @Post('/signUp')
    @UsePipes(ValidationPipe)
    async signUp(@Body() createUserDto: CreateUserDto, @Body('role') role: Array<string>) {
            return await this.authService.signUp(createUserDto, role);
    }

}
