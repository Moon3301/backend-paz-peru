import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { BlogService } from './blog.service';
import { BlogPublicController, BlogAdminController } from './blog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  controllers: [BlogPublicController, BlogAdminController],
  providers: [BlogService],
})
export class BlogModule {}
