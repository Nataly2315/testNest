import {Module} from '@nestjs/common';
import {TaskService} from './task.service';
import {TaskController} from './task.controller';
import {TaskSchema } from './schemas/task.schema';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forFeature([ {name: 'Task', schema: TaskSchema}])],
    providers: [TaskService],
    controllers: [TaskController]
})

export class TaskModule {
}
