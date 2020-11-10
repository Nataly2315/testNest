import { Module } from '@nestjs/common';

import { MongooseModule } from "@nestjs/mongoose";
import { TaskModule } from './task/task.module';
import {TaskService} from "./task/task.service";
import {TaskController} from "./task/task.controller";
import {UserModule} from "./user/user.module";


@Module({
  imports: [
      MongooseModule.forRoot("mongodb+srv://Admin:1kRAaBVZypQ78ckJ@cluster0-hhboy.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,

      }), TaskModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
