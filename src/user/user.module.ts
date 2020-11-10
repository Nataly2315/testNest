import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserSchema} from "./schemas/user.schemas";
import {UserService} from './user.service';
import {MongooseModule} from "@nestjs/mongoose";


@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {
}
