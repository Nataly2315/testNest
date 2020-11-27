import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    UseGuards,
    Req, NotFoundException, HttpStatus, Query
} from '@nestjs/common';
import {ProjectService} from './project.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {ObjectIdDTO} from "../user/dto/object-id.dto";
import JwtAuthenticationGuard from "../auth/guards/jwt-authentification.guard";
import {IsMongoId} from "class-validator";
import {TaskFilterDto} from "../task/dto/task-filter.dto";
import {ProjectFilterDto} from "./dto/filter-project.dto";


@Controller('projects')
@UsePipes(new ValidationPipe())
@UseGuards(JwtAuthenticationGuard)
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {
    }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
        return this.projectService.create(createProjectDto, req.user);
    }

    @Get()
    findAll(@Query() query: ProjectFilterDto) {
        return this.projectService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        const project = await this.projectService.findOne(id);
        if (!project) {
            throw new NotFoundException('Project does not exist!');
        }
        return project;
    }

    @Get(':id/tasks')
    async findTasks(@Param('id') id) {
        const project = await this.projectService.findTasksByProject(id);
        if (!project) {
            throw new NotFoundException('Project does not exist!');
        }
        return project;
    }

    @Put(':id')
    async update(@Param('id') id, @Body() updateProjectDto: UpdateProjectDto) {
        const project = await this.projectService.update(id, updateProjectDto);
        if (!project) {
            throw new NotFoundException('Project does not exist!');
        }
        return project;
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        const project = await this.projectService.remove(id);
        if (!project) {
            throw new NotFoundException('Project does not exist!');
        }
        return project;
    }
}
