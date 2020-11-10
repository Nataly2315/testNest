import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

import {AuthService} from "./auth.service";
import {AuthController} from './auth.controller';
import {UserModule} from "../user/user.module";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
                secret:'JWT_SECRET',
                signOptions: {
                    expiresIn: 3600,
                }
            }
        ),
        PassportModule.register({defaultStrategy: 'jwt'})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {
}