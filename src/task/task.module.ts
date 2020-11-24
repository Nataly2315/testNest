import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {TaskService} from './task.service';
import {TaskController} from './task.controller';
import {TaskSchema } from './schemas/task.schema';
import {AuthModule} from "../auth/auth.module";
import {EventsGateway} from "../events/events.gateway";

@Module({
    imports: [MongooseModule.forFeature([ {name: 'Task', schema: TaskSchema}]), AuthModule],
    providers: [TaskService, EventsGateway],
    controllers: [TaskController]
})

export class TaskModule {
}
