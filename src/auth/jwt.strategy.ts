import { ExtractJwt, Strategy } from 'passport-jwt';
import * as _ from 'lodash';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {ConfigService} from "@nestjs/config";
import {User} from "../user/interfaces/user.interface";
import {ObjectIdDTO} from "../user/dto/object-id.dto";
import {Payload} from "./interfaces/payload.interface";



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

    async validate(payload: Payload): Promise<User>{
       let user = await this.userService.getUserById(payload.id);
       if(!user){
           throw new UnauthorizedException();
       }
       return _.omit(user,['password']);
    }
}