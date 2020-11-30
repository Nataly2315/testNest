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
import {ApiCreatedResponse, ApiNotFoundResponse, ApiOperation} from "@nestjs/swagger";
import {TaskService} from "./task.service";
import {CreateTaskDTO} from "./dto/create-task.dto";
import JwtAuthenticationGuard from "../auth/guards/jwt-authentification.guard";
import {RolesGuard} from "../auth/guards/roles.guard";
import {TaskFilterDto} from "./dto/task-filter.dto";
import {ApiImplicitQuery} from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";

@Controller('tasks')
@UseGuards(JwtAuthenticationGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class TaskController {
    constructor(private taskService: TaskService) {
    }

    @Post()
    @ApiCreatedResponse({ description: 'OK'})
    @ApiOperation({ operationId: 'addTask', description: 'create new task' })
    async addTask(@Req() req, @Body() createTaskDTO: CreateTaskDTO) {
        const newTask = await this.taskService.addTask(createTaskDTO, req.user);
        return newTask;
    }

    @Get('/:taskID')
    @ApiCreatedResponse({ description: 'OK'})
    @ApiNotFoundResponse({ type: NotFoundException, description: 'Task does not exist!' })
    @ApiOperation({ operationId: 'getTask', description: 'get task info' })
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
    @ApiCreatedResponse({ description: 'OK'})
    @ApiOperation({ operationId: 'getTasksList', description: 'get task list' })
    async getTasks(@Query() query: TaskFilterDto) {
        return  await this.taskService.getTasks(query);
    }

    @Put('/:taskID')
    @ApiCreatedResponse({ description: 'OK'})
    @ApiNotFoundResponse({ type: NotFoundException, description: 'Task does not exist!' })
    @ApiOperation({ operationId: 'editTasks', description: 'edit task info' })
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
    @ApiCreatedResponse({ description: 'OK'})
    @ApiNotFoundResponse({ type: NotFoundException, description: 'Task does not exist!' })
    @ApiOperation({ operationId: 'deleteTask', description: 'delete task' })
    async deleteTask(@Res() res, @Req() req, @Param('taskID') taskID) {
        const task = await this.taskService.deleteTask(taskID);
        res.status(HttpStatus.OK).json({
                message: `Task ${taskID} was deleted`
            }
        )
    }


}