import {Injectable} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongodb";
import {Project} from "./interfaces/project.interface";
import {ObjectIdDTO} from "../user/dto/object-id.dto";
import {User} from "../user/interfaces/user.interface";
import {Task} from "../task/interfaces/task.interface";

@Injectable()
export class ProjectService {
    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>,
                @InjectModel('Task') private readonly taskModel: Model<Task>) {
    }

    create(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
        return this.projectModel.create(Object.assign(createProjectDto, {author: user._id}));
    }

    findAll(): Promise<Project[]> {
        return this.projectModel.find();
    }

    async findOne(id: ObjectIdDTO): Promise<Project> {
        return await this.projectModel.findById(id).populate('tasks');
    }

    update(id: ObjectIdDTO, updateProjectDto: UpdateProjectDto): Promise<Project> {
        return this.projectModel.findByIdAndUpdate(id, Object.assign(updateProjectDto, {updatedAt: Date.now()}));
    }

    remove(id: ObjectIdDTO): Promise<Project> {
        this.taskModel.remove({project: id});
        return this.projectModel.remove(id);
    }
}
