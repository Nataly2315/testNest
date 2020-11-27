import {
    Controller,
    HttpStatus,
    Post,
    Res,
    Body,
    Get,
    NotFoundException,
    ValidationPipe,
    Param,
    Put,
    Delete,
    UseGuards, Req, UsePipes, Query
} from '@nestjs/common';
import {TaskService} from "./task.service";
import {CreateTaskDTO} from "./dto/create-task.dto";
import JwtAuthenticationGuard from "../auth/guards/jwt-authentification.guard";
import {RolesGuard} from "../auth/guards/roles.guard";
import {TaskFilterDto} from "./dto/task-filter.dto";


@Controller('tasks')
@UseGuards(JwtAuthenticationGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class TaskController {
    constructor(private taskService: TaskService) {
    }

    @Post()
    async addTask(@Req() req, @Body() createTaskDTO: CreateTaskDTO) {
        const newTask = await this.taskService.addTask(createTaskDTO, req.user);
        return newTask;
    }

    @Get('/:taskID')
    async getTask(@Res() res, @Param('taskID') taskID) {
        const task = await this.taskService.getTask(taskID);
        if (!task) {
            throw new NotFoundException('Task does not exist!');
        }
        res.status(HttpStatus.OK).json({
            task
        })
    }

    @Get('/')
    async getTasks(@Query() query: TaskFilterDto) {
        return  await this.taskService.getTasks(query);
    }

    @Put('/:taskID')
    async updateTask(@Res() res, @Req() req, @Param('taskID') taskID, @Body()  createTaskDTO: CreateTaskDTO) {
        const task = await this.taskService.updateTask(taskID, createTaskDTO, req.user);
        if (!task) {
            throw new NotFoundException('Task does not exist!');
        }
        res.status(HttpStatus.OK).json(
            task
        )
    }

    @Delete('/:taskID')
    async deleteTask(@Res() res, @Req() req, @Param('taskID') taskID) {
        const task = await this.taskService.deleteTask(taskID);
        res.status(HttpStatus.OK).json({
                message: `Task ${taskID} was deleted`
            }
        )
    }


}