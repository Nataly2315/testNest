import {Controller, Post, UseGuards, Body, Request, Get} from '@nestjs/common';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {AuthService} from "./auth.service";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }


    @Post('/login')
    async login(@Body() authCredentials: AuthCredentialsDto) {
        return this.authService.login(authCredentials);
    }

    @Post('/signUp')
    async signUp(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async get(@Request() req
    ) {
        return {
            "auth": req.user
        }
    }
}
