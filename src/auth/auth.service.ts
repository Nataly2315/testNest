import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
    }

    async login(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const user = await this.userService.validateUser(authCredentialsDto);
        if (user) {
            return {
                accessToken: this.jwtService.sign({
                    id: user._id,
                    role: user.role, email: user.email
                }),
            };
        }
        else {
             throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    async signUp(createUserDto: CreateUserDto, roles: Array<string>) {
        try {
            await this.userService.createUser(createUserDto, roles);
        } catch (e) {
            if (e.code === 11000) {
                throw new HttpException('User already exists.', HttpStatus.BAD_REQUEST)
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
