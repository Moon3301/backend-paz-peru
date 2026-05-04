import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  filename: string;

  @Column({ name: 'original_name', length: 255 })
  originalName: string;

  @Column({ name: 'mime_type', length: 100 })
  mimeType: string;

  @Column({ name: 'size_bytes' })
  sizeBytes: number;

  @Column({ length: 500 })
  url: string;

  /**
   * 'local' por defecto; preparado para 's3' cuando se migre el almacenamiento.
   */
  @Column({ name: 'storage_type', length: 20, default: 'local' })
  storageType: string;

  @Column({ name: 'entity_type', length: 50, nullable: true })
  entityType: string;

  @Column({ name: 'entity_id', nullable: true })
  entityId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
