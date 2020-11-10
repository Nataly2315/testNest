import {Controller, HttpStatus, Post, Res, Body, Get, NotFoundException, Param} from '@nestjs/common';
import {TaskService} from "./task.service";
import {CreateTaskDTO} from "./dto/create-task.dto";

//import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';


@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {
    }

    @Post()
    async addTask(@Res() res, @Body() createTaskDTO: CreateTaskDTO) {
        console.log("task post");
        const newTask = await this.taskService.addTask(createTaskDTO);
        return res.status(HttpStatus.OK).json({
            task: newTask
        })
    }

    @Get('/:taskID')
    async getTask(@Res() res, @Param('taskID',/* new ValidateObjectId()*/) taskID) {
        console.log(taskID);
        const task = await this.taskService.getTask(taskID);
        if (!task) {
            throw new NotFoundException('Task does not exist!');
        }
        res.status(HttpStatus.OK).json({
            task
        })
    }

    @Get('/tasks')
    async getTasks(@Res() res) {
        const tasks = await this.taskService.getTasks();
        res.status(HttpStatus.OK).json(
            tasks
        )
    }

}