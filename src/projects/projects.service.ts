import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProjectSection, SectionKey } from './entities/project-section.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(ProjectSection)
    private readonly sectionRepo: Repository<ProjectSection>,
  ) {}

  // ── Públicos ─────────────────────────────────────────────────────────────

  async findAllPublic(): Promise<Project[]> {
    return this.projectRepo.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC', name: 'ASC' },
    });
  }

  async findBySlug(slug: string): Promise<Omit<Project, 'sections'> & { sections: Record<string, unknown> }> {
    const project = await this.projectRepo.findOne({ where: { slug, isActive: true } });
    if (!project) throw new NotFoundException(`Proyecto '${slug}' no encontrado`);

    const sections = await this.sectionRepo.find({
      where: { projectId: project.id, isVisible: true },
      order: { sortOrder: 'ASC' },
    });

    const sectionsMap = sections.reduce<Record<string, unknown>>((acc, s) => {
      acc[s.sectionKey] = s.getParsedConfig();
      return acc;
    }, {});

    return { ...project, sections: sectionsMap };
  }

  // ── Admin ─────────────────────────────────────────────────────────────────

  async findAll(): Promise<Project[]> {
    return this.projectRepo.find({ order: { sortOrder: 'ASC', name: 'ASC' } });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) throw new NotFoundException(`Proyecto ${id} no encontrado`);
    return project;
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const existing = await this.projectRepo.findOne({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException(`Ya existe un proyecto con slug '${dto.slug}'`);
    const project = this.projectRepo.create(dto);
    return this.projectRepo.save(project);
  }

  async update(id: number, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, dto);
    return this.projectRepo.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.findOne(id);
    project.isActive = false;
    await this.projectRepo.save(project);
  }

  async toggleActive(id: number): Promise<Project> {
    const project = await this.findOne(id);
    project.isActive = !project.isActive;
    return this.projectRepo.save(project);
  }

  // ── Secciones ─────────────────────────────────────────────────────────────

  async getSections(projectId: number): Promise<ProjectSection[]> {
    await this.findOne(projectId);
    return this.sectionRepo.find({
      where: { projectId },
      order: { sortOrder: 'ASC' },
    });
  }

  async upsertSection(projectId: number, dto: UpdateSectionDto): Promise<ProjectSection> {
    await this.findOne(projectId);

    let section = await this.sectionRepo.findOne({
      where: { projectId, sectionKey: dto.sectionKey as SectionKey },
    });

    if (!section) {
      section = this.sectionRepo.create({ projectId, sectionKey: dto.sectionKey as SectionKey });
    }

    section.setConfig(dto.config);
    if (dto.isVisible !== undefined) section.isVisible = dto.isVisible;
    if (dto.sortOrder !== undefined) section.sortOrder = dto.sortOrder;

    return this.sectionRepo.save(section);
  }

  async removeSection(projectId: number, sectionKey: SectionKey): Promise<void> {
    const section = await this.sectionRepo.findOne({ where: { projectId, sectionKey } });
    if (!section) throw new NotFoundException(`Sección '${sectionKey}' no encontrada`);
    await this.sectionRepo.remove(section);
  }
}
