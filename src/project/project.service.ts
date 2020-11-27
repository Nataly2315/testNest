import {Injectable} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongodb";
import * as mongoose from "mongoose";
import {Project} from "./interfaces/project.interface";
import {ObjectIdDTO} from "../user/dto/object-id.dto";
import {User} from "../user/interfaces/user.interface";
import {Task} from "../task/interfaces/task.interface";
import {ProjectFilterDto} from "./dto/filter-project.dto";
import * as _ from "lodash";
import {TaskFilterDto} from "../task/dto/task-filter.dto";


@Injectable()
export class ProjectService {
    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>,
                @InjectModel('Task') private readonly taskModel: Model<Task>) {
    }

    create(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
        return this.projectModel.create(Object.assign(createProjectDto, {author: user._id}));
    }

    async findAll(query: ProjectFilterDto): Promise<{ projects: Project[], pages: number }> {
        const page = +query.page || 1;
        const limit = +query.pageSize || 100;
        const skip = (page - 1) * limit;
        const [result] = await this.projectModel.aggregate([
            {
                $facet: {
                    count: [{$count: "value"}],
                    projects: [{$match: _.omit(query, ["pageSize", "page"])}, {$skip: skip}, {$limit: limit}]
                }
            },
            {$unwind: "$count"},
            {$set: {count: "$count.value"}}
        ]);
        return {projects: result.projects, pages: Math.trunc(result.count / limit) || 1}
    }

    async findOne(id: ObjectIdDTO): Promise<Project> {
        return this.projectModel.findById(id);
    }

    async findTasksByProject(id: ObjectIdDTO): Promise<Project> {
        return this.projectModel.aggregate([
            {"$match": {"_id": mongoose.Types.ObjectId(id)}},
            {
                "$lookup": {
                    from: "tasks",
                    pipeline: [{
                        $match: {
                            $and: [
                                {
                                    project:
                                        {
                                            $in: [mongoose.Types.ObjectId(id)]
                                        }
                                }],
                        },
                    }],
                    as: "tasks"
                }
            }
        ])
    }

    update(id: ObjectIdDTO, updateProjectDto: UpdateProjectDto): Promise<Project> {
        return this.projectModel.findByIdAndUpdate(id, Object.assign(updateProjectDto, {updatedAt: Date.now()}));
    }

    remove(id: ObjectIdDTO): Promise<Project> {
        this.taskModel.remove({project: id});
        return this.projectModel.findByIdAndDelete(id);
    }
}
