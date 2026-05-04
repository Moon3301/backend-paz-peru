import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('promotions')
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  /** Nombre del proyecto en promoción, ej: "Serena" */
  @Column({ length: 200 })
  title: string;

  /** Texto descriptivo, ej: "Tu depa de 2 ambientes con precio desde" */
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'image_url', length: 500, nullable: true })
  imageUrl: string;

  /** Precio o etiqueta destacada, ej: "S/439,000*" */
  @Column({ name: 'badge_text', length: 100, nullable: true })
  badgeText: string;

  /** Distrito, ej: "San Miguel" */
  @Column({ length: 100, nullable: true })
  district: string;

  /** Ruta interna del proyecto, ej: "/departamentos-en-venta/san-miguel/serena" */
  @Column({ name: 'project_link', length: 500, nullable: true })
  projectLink: string;

  /** Texto legal completo del disclaimer */
  @Column({ type: 'text', nullable: true })
  disclaimer: string;

  /** true = aparece en la sección destacada (3 columnas) */
  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  @Column({ name: 'project_id', nullable: true })
  projectId: number;

  @ManyToOne(() => Project, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'starts_at', nullable: true })
  startsAt: Date;

  @Column({ name: 'ends_at', nullable: true })
  endsAt: Date;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
