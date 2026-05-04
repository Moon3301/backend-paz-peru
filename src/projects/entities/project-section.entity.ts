import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';

export type SectionKey =
  | 'hero'
  | 'promo_banner'
  | 'specs'
  | 'amenities'
  | 'quoter'
  | 'gallery'
  | 'video'
  | 'virtual_tour'
  | 'ubication'
  | 'executives';

@Entity('project_sections')
export class ProjectSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'project_id' })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.sections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ name: 'section_key', length: 50 })
  sectionKey: SectionKey;

  /**
   * Configuración completa del componente serializada como JSON.
   * Cada sectionKey tiene su propio shape — ver project-config.interface.ts en el frontend.
   */
  @Column({ type: 'longtext', nullable: true })
  config: string;

  @Column({ name: 'is_visible', default: true })
  isVisible: boolean;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  getParsedConfig<T = Record<string, unknown>>(): T | null {
    if (!this.config) return null;
    try {
      return JSON.parse(this.config) as T;
    } catch {
      return null;
    }
  }

  setConfig(value: unknown): void {
    this.config = JSON.stringify(value);
  }
}
