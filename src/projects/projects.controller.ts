import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import type { SectionKey } from './entities/project-section.entity';
import { Public } from '../auth/decorators/public.decorator';

// ── Endpoints públicos ────────────────────────────────────────────────────

@Public()
@Controller('projects')
export class ProjectsPublicController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAllPublic();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }
}

// ── Endpoints de administración ───────────────────────────────────────────

@Controller('admin/projects')
export class ProjectsAdminController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Patch(':id/toggle')
  toggleActive(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.toggleActive(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.remove(id);
  }

  // ── Secciones ──────────────────────────────────────────────────────────

  @Get(':id/sections')
  getSections(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getSections(id);
  }

  @Patch(':id/sections')
  upsertSection(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSectionDto) {
    return this.projectsService.upsertSection(id, dto);
  }

  @Delete(':id/sections/:sectionKey')
  removeSection(
    @Param('id', ParseIntPipe) id: number,
    @Param('sectionKey') sectionKey: SectionKey,
  ) {
    return this.projectsService.removeSection(id, sectionKey);
  }
}
