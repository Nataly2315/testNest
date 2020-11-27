import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ProjectSchema} from "./schemas/project.schema";
import {TaskSchema} from "../task/schemas/task.schema";

@Module({
  imports:[MongooseModule.forFeature([{name: 'Project', schema: ProjectSchema}, {name: 'Task', schema:TaskSchema}])],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
