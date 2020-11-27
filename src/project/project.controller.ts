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
  Req
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {ObjectIdDTO} from "../user/dto/object-id.dto";
import JwtAuthenticationGuard from "../auth/guards/jwt-authentification.guard";
import {IsMongoId} from "class-validator";


@Controller('projects')
@UsePipes(new ValidationPipe())
@UseGuards(JwtAuthenticationGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() req) {
    return this.projectService.create(createProjectDto, req.user);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.projectService.remove(id);
  }
}
