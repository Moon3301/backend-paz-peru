import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../auth/decorators/roles.decorator';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { ProjectSection } from '../projects/entities/project-section.entity';
import { Promotion } from '../promotions/entities/promotion.entity';
import { DeliveredProject } from '../delivered-projects/entities/delivered-project.entity';
import { District } from '../districts/entities/district.entity';
import { CmsSetting } from '../cms-settings/entities/cms-setting.entity';
import { BlogPost } from '../blog/entities/blog-post.entity';

/** Dev Tools — exclusivo para el rol 'admin' */
@Roles('admin')
@Controller('admin/seed-export')
export class DevToolsController {
  constructor(
    @InjectRepository(Project) private readonly projectsRepo: Repository<Project>,
    @InjectRepository(ProjectSection) private readonly sectionsRepo: Repository<ProjectSection>,
    @InjectRepository(Promotion) private readonly promotionsRepo: Repository<Promotion>,
    @InjectRepository(DeliveredProject) private readonly deliveredRepo: Repository<DeliveredProject>,
    @InjectRepository(District) private readonly districtsRepo: Repository<District>,
    @InjectRepository(CmsSetting) private readonly settingsRepo: Repository<CmsSetting>,
    @InjectRepository(BlogPost) private readonly blogRepo: Repository<BlogPost>,
  ) {}

  @Get()
  async exportSeed() {
    const [projects, allSections, promotions, delivered, districts, settings, blogPosts] =
      await Promise.all([
        this.projectsRepo.find({ order: { sortOrder: 'ASC' } }),
        this.sectionsRepo.find({ order: { sortOrder: 'ASC' } }),
        this.promotionsRepo.find({ order: { sortOrder: 'ASC' } }),
        this.deliveredRepo.find({ order: { sortOrder: 'ASC' } }),
        this.districtsRepo.find({ order: { sortOrder: 'ASC' } }),
        this.settingsRepo.find({ order: { key: 'ASC' } }),
        this.blogRepo.find({ order: { publishedAt: 'DESC' } }),
      ]);

    // Index sections by projectId
    const sectionsByProject = new Map<number, ProjectSection[]>();
    for (const s of allSections) {
      const list = sectionsByProject.get(s.projectId) ?? [];
      list.push(s);
      sectionsByProject.set(s.projectId, list);
    }

    const projectsExport = projects.map(p => {
      const sectionsList = sectionsByProject.get(p.id) ?? [];
      const sectionsObj: Record<string, unknown> = {};
      for (const s of sectionsList) {
        sectionsObj[s.sectionKey] = s.getParsedConfig() ?? {};
      }
      return {
        slug: p.slug,
        name: p.name,
        district: p.district,
        status: p.status,
        logoUrl: p.logoUrl,
        thumbnailUrl: p.thumbnailUrl,
        sperantProjectId: p.sperantProjectId,
        sortOrder: p.sortOrder,
        isActive: p.isActive,
        sections: sectionsObj,
      };
    });

    const promotionsExport = promotions.map(pr => ({
      title: pr.title,
      district: pr.district,
      description: pr.description,
      badgeText: pr.badgeText,
      imageUrl: pr.imageUrl,
      projectLink: pr.projectLink,
      disclaimer: pr.disclaimer,
      isFeatured: pr.isFeatured,
      isActive: pr.isActive,
      sortOrder: pr.sortOrder,
    }));

    const deliveredExport = delivered.map(d => ({
      name: d.name,
      district: d.district,
      address: d.address,
      rooms: d.rooms,
      imageUrl: d.imageUrl,
      isActive: d.isActive,
      sortOrder: d.sortOrder,
    }));

    const districtsExport = districts.map(d => ({
      label: d.label,
      slug: d.slug,
      mapImage: d.mapImage,
      isActive: d.isActive,
      sortOrder: d.sortOrder,
    }));

    const settingsExport = settings.map(s => ({
      key: s.key,
      value: s.value,
      label: s.label,
    }));

    const blogExport = blogPosts.map(b => ({
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      coverImageUrl: b.coverImageUrl,
      author: b.author,
      category: b.category,
      tags: b.tags,
      readTime: b.readTime,
      isPublished: b.isPublished,
      publishedAt: b.publishedAt,
    }));

    return {
      exportedAt: new Date().toISOString(),
      projects: projectsExport,
      promotions: promotionsExport,
      deliveredProjects: deliveredExport,
      districts: districtsExport,
      cmsSettings: settingsExport,
      blogPosts: blogExport,
    };
  }
}
