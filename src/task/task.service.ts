import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Task} from "./interfaces/task.interface";
import {CreateTaskDTO} from "./dto/create-task.dto";

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {
        console.log(taskModel);
    }

    async addTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const newTask = await this.taskModel(createTaskDTO);
        return newTask.save();
    }

    async getTask(taskID): Promise<Task> {
        const task = await this.taskModel.findById(taskID).exec();
        return task;
    }

    async getTasks(): Promise<Task[]>{
        const tasks = await this.taskModel.find().exec();
        return tasks;
    }

    async updateTask(taskID, createTaskDTO: CreateTaskDTO): Promise<Task> {
        const editedTask = await this.taskModel
            .findByIdAndUpdate(taskID, createTaskDTO, { new: true });
        return editedTask;
    }

    async deleteTask(taskID): Promise<Task> {
      return await this.taskModel.findByIdAndDelete(taskID);
    }
}
