import {
    Controller,
    HttpStatus,
    Post,
    Res,
    Body,
    Get,
    NotFoundException,
    Param,
    Put,
    Delete,
    UseGuards, Req
} from '@nestjs/common';
import {TaskService} from "./task.service";
import {CreateTaskDTO} from "./dto/create-task.dto";
import JwtAuthenticationGuard from "../auth/jwt-authentification.guard";


//import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';


@Controller('tasks')
@UseGuards(JwtAuthenticationGuard)
export class TaskController {
    constructor(private taskService: TaskService) {
    }

    @Post()
    async addTask(@Req() req, @Res() res, @Body() createTaskDTO: CreateTaskDTO) {
        const newTask = await this.taskService.addTask(createTaskDTO, req.user);
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

    @Get('/')
    async getTasks(@Res() res) {
        const tasks = await this.taskService.getTasks();
        res.status(HttpStatus.OK).json(
            tasks
        )
    }

    @Put('/:taskID')
    async updateTask(@Res() res, @Req() req, @Param('taskID',/* new ValidateObjectId()*/) taskID, @Body()  createTaskDTO: CreateTaskDTO){
        const task = await this.taskService.updateTask(taskID,createTaskDTO, req.user);
        if (!task) {
            throw new NotFoundException('Task does not exist!');
        }
        res.status(HttpStatus.OK).json(
            task
        )
    }

    @Delete('/:taskID')
    async deleteTask(@Res() res, @Param('taskID',/* new ValidateObjectId()*/) taskID){
        const task = await this.taskService.deleteTask(taskID);
        res.status(HttpStatus.OK).json({
            message: `Task ${taskID} was deleted`}
        )
    }



}