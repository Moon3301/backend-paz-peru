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
