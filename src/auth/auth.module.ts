import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

import {AuthService} from "./auth.service";
import {AuthController} from './auth.controller';
import {UserModule} from "../user/user.module";
import {JwtStrategy} from "./jwt.strategy";
import {configModule} from "../configure.root";
import {RolesGuard} from "./guards/roles.guard";

@Module({
    imports: [
        UserModule, configModule,
        JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: 3600,
                }
            }
        ),
        PassportModule.register({defaultStrategy: 'jwt'})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RolesGuard],
    exports: [JwtStrategy,
        PassportModule,
        AuthService]
})
export class AuthModule {
}
