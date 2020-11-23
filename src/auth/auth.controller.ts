import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe, Res, HttpStatus
} from '@nestjs/common';
import {Response} from 'express';
import {AuthService} from "./auth.service";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";

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
    async signUp(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
        await this.authService.signUp(createUserDto);
        res.status(HttpStatus.OK).json({message: 'user was created'});
    }

}
