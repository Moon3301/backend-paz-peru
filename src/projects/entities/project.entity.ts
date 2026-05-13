import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProjectSection } from './project-section.entity';

export type ProjectStatus = 'LANZAMIENTO' | 'EN CONSTRUCCIÓN' | 'ENTREGA' | 'AGOTADO';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  slug: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 100 })
  district: string;

  @Column({ length: 50, default: 'LANZAMIENTO' })
  status: ProjectStatus;

  @Column({ name: 'logo_url', length: 500, nullable: true })
  logoUrl: string;

  @Column({ name: 'thumbnail_url', length: 500, nullable: true })
  thumbnailUrl: string;

  @Column({ name: 'sperant_project_id', nullable: true })
  sperantProjectId: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  // ── SEO ──────────────────────────────────────────────────────────────────

  /** Título para <title> y og:title. Si está vacío usa el nombre del proyecto. */
  @Column({ name: 'meta_title', type: 'varchar', length: 200, nullable: true, default: null })
  metaTitle: string | null;

  /** Texto para <meta name="description"> y og:description. */
  @Column({ name: 'meta_description', type: 'text', nullable: true, default: null })
  metaDescription: string | null;

  /** Keywords separadas por coma para <meta name="keywords">. */
  @Column({ name: 'meta_keywords', type: 'varchar', length: 500, nullable: true, default: null })
  metaKeywords: string | null;

  /** URL de imagen para og:image y twitter:image del proyecto. */
  @Column({ name: 'og_image_url', type: 'varchar', length: 500, nullable: true, default: null })
  ogImageUrl: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ProjectSection, (section) => section.project, {
    cascade: true,
    eager: false,
  })
  sections: ProjectSection[];
}
