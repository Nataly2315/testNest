import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {TaskModule} from './task/task.module';
import {AuthModule} from './auth/auth.module';
import {UserModule} from "./user/user.module";
import {configModule} from "./configure.root";


@Module({
    imports: [
        TaskModule,configModule,
        MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }),
        UserModule,
        AuthModule
    ],
    controllers: [],
    providers: [],
})

export class AppModule {
}
