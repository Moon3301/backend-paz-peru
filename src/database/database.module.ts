import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Project } from '../projects/entities/project.entity';
import { ProjectSection } from '../projects/entities/project-section.entity';
import { Promotion } from '../promotions/entities/promotion.entity';
import { DeliveredProject } from '../delivered-projects/entities/delivered-project.entity';
import { Event } from '../events/entities/event.entity';
import { BlogPost } from '../blog/entities/blog-post.entity';
import { Media } from '../media/entities/media.entity';
import { Admin } from '../auth/entities/admin.entity';
import { District } from '../districts/entities/district.entity';
import { CmsSetting } from '../cms-settings/entities/cms-setting.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [Project, ProjectSection, Promotion, DeliveredProject, Event, BlogPost, Media, Admin, District, CmsSetting],
        synchronize: config.get<string>('DB_SYNC') === 'true',
        dropSchema: config.get<string>('DB_DROP') === 'true',
        charset: 'utf8mb4',
        timezone: '+00:00',
      }),
    }),
  ],
})
export class DatabaseModule { }
