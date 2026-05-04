import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blog_posts')
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 200 })
  slug: string;

  @Column({ length: 300 })
  title: string;

  @Column({ type: 'text', nullable: true })
  excerpt: string;

  @Column({ type: 'longtext', nullable: true })
  content: string;

  @Column({ name: 'cover_image_url', length: 500, nullable: true })
  coverImageUrl: string;

  @Column({ length: 150, nullable: true })
  author: string;

  @Column({ length: 100, nullable: true })
  category: string;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ name: 'read_time', type: 'int', nullable: true, default: 5 })
  readTime: number;

  @Column({ name: 'is_published', default: false })
  isPublished: boolean;

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
