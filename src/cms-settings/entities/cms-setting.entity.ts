import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('cms_settings')
export class CmsSetting {
  @PrimaryGeneratedColumn()
  id: number;

  /** Clave única, ej: "home_promo_banner" */
  @Column({ unique: true, length: 100 })
  key: string;

  /** Valor (URL de imagen, texto, JSON, etc.) */
  @Column({ type: 'text', nullable: true })
  value: string;

  /** Etiqueta legible para el panel de administración */
  @Column({ length: 300, nullable: true })
  label: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
