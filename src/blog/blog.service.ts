import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly repo: Repository<BlogPost>,
  ) {}

  findAllPublic(): Promise<BlogPost[]> {
    return this.repo.find({
      where: { isPublished: true },
      select: ['id', 'slug', 'title', 'excerpt', 'coverImageUrl', 'author', 'category', 'tags', 'readTime', 'publishedAt'],
      order: { publishedAt: 'DESC' },
    });
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.repo.findOne({ where: { slug, isPublished: true } });
    if (!post) throw new NotFoundException(`Post '${slug}' no encontrado`);
    return post;
  }

  findAll(): Promise<BlogPost[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<BlogPost> {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) throw new NotFoundException(`Post ${id} no encontrado`);
    return post;
  }

  async create(dto: CreateBlogPostDto): Promise<BlogPost> {
    const existing = await this.repo.findOne({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException(`Ya existe un post con slug '${dto.slug}'`);
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateBlogPostDto): Promise<BlogPost> {
    const post = await this.findOne(id);
    Object.assign(post, dto);
    return this.repo.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.repo.remove(post);
  }
}
