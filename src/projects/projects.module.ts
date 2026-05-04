import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectSection } from './entities/project-section.entity';
import { ProjectsService } from './projects.service';
import { ProjectsPublicController, ProjectsAdminController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectSection])],
  controllers: [ProjectsPublicController, ProjectsAdminController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
