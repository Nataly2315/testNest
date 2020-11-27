import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Task} from "./interfaces/task.interface";
import {CreateTaskDTO} from "./dto/create-task.dto";
import {User} from "../user/interfaces/user.interface";
import {EventsGateway} from "../events/events.gateway";
import {TaskChanges} from "./interfaces/task-change-object.interface";
import {Project} from "../project/interfaces/project.interface";


@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>, @InjectModel('Project') private readonly projectModel: Model<Project>, private socket: EventsGateway) {
        this.checkTasksChanges();
    }

    async addTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        const newTask = await this.taskModel(Object.assign(createTaskDTO, {author: user._id}));
        await this.projectModel.findByIdAndUpdate(newTask.project,{
            '$push': {
                'tasks': newTask.id
            }})
        return newTask.save();
    }

    async getTask(taskID): Promise<Task> {
        const task = await this.taskModel.findById(taskID).exec();
        return task;
    }

    async getTasks(): Promise<Task[]> {
        const tasks = await this.taskModel.find().exec();
        return tasks;
    }

    async updateTask(taskID, createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        const editedTask = await this.taskModel.findByIdAndUpdate(taskID, Object.assign(createTaskDTO, {executor: user._id}), {new: true});
        return editedTask;
    }

    async deleteTask(taskID): Promise<Task> {
        const deletedTask = await this.taskModel.findByIdAndDelete(taskID);
        await this.projectModel.findByIdAndUpdate(deletedTask.project,{
            '$pull': {
                'tasks': [deletedTask.id]
            }})
        return  deletedTask;
    }

    async checkTasksChanges(): Promise<void> {
        this.taskModel.watch().on('change', (data: TaskChanges) => {
            this.socket.sendEvent(data.operationType, data)
        })
    }
}
