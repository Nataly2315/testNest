import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../user/interfaces/user.interface";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET')
        });
    }

    async validate(payload: { id: string, email: string, role: Array<string> }): Promise<User>{
       const user = this.userService.getUserByEmail(payload.email);
       if(!user){
           throw new UnauthorizedException();
       }
       return user;
    }
}