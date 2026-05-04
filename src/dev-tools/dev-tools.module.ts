import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevToolsController } from './dev-tools.controller';
import { Project } from '../projects/entities/project.entity';
import { ProjectSection } from '../projects/entities/project-section.entity';
import { Promotion } from '../promotions/entities/promotion.entity';
import { DeliveredProject } from '../delivered-projects/entities/delivered-project.entity';
import { District } from '../districts/entities/district.entity';
import { CmsSetting } from '../cms-settings/entities/cms-setting.entity';
import { BlogPost } from '../blog/entities/blog-post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      ProjectSection,
      Promotion,
      DeliveredProject,
      District,
      CmsSetting,
      BlogPost,
    ]),
  ],
  controllers: [DevToolsController],
})
export class DevToolsModule {}
