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
    Req, NotFoundException, HttpStatus, Query, Res
} from '@nestjs/common';
import {ApiCreatedResponse, ApiNotFoundResponse, ApiOperation} from "@nestjs/swagger";
import {ProjectService} from './project.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import JwtAuthenticationGuard from "../auth/guards/jwt-authentification.guard";
import {ProjectFilterDto} from "./dto/filter-project.dto";
import {FiltersPipe} from "./filters.pipe";


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
    @ApiCreatedResponse({ description: 'OK'})
    @ApiOperation({ operationId: 'getProjectList', description: 'get project list' })
    findAll(@Query(new FiltersPipe()) query: ProjectFilterDto) {
        return this.projectService.findAll(query);
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'OK'})
    @ApiNotFoundResponse({ type: NotFoundException, description: 'Project does not exist!' })
    @ApiOperation({ operationId: 'getProject', description: 'get project info by id' })
    async findOne(@Param('id') id) {
        const project = await this.projectService.findOne(id);
        if (!project) {
            throw new NotFoundException('Project does not exist!');
        }
        return project;
    }

    @Get(':id/tasks')
    @ApiCreatedResponse({ description: 'OK'})
    @ApiOperation({ operationId: 'getTasksByProject', description: 'get tasks list by project id' })
    async findTasks(@Param('id') id, @Res() res) {
    res.redirect(`/tasks?project=${id}`);
    }

    @Put(':id')
    @ApiCreatedResponse({ description: 'OK'})
    @ApiNotFoundResponse({ type: NotFoundException, description: 'Project does not exist!' })
    @ApiOperation({ operationId: 'editProject', description: 'edit project info' })
    async update(@Param('id') id, @Body() updateProjectDto: UpdateProjectDto) {
        const project = await this.projectService.update(id, updateProjectDto);
        if (!project) {
            throw new NotFoundException('Project does not exist!');
        }
        return project;
    }

    @Delete(':id')
    @ApiCreatedResponse({ description: 'OK'})
    @ApiNotFoundResponse({ type: NotFoundException, description: 'Project does not exist!' })
    @ApiOperation({ operationId: 'deleteProject', description: 'delete Project' })
    async remove(@Param('id') id) {
        const project = await this.projectService.remove(id);
        if (!project) {
            throw new NotFoundException('Project does not exist!');
        }
        return project;
    }
}
