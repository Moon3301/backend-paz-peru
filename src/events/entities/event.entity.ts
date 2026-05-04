import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type EventType = 'EVENT' | 'FAIR';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 10, default: 'EVENT' })
  type: EventType;

  @Column({ name: 'image_url', length: 500, nullable: true })
  imageUrl: string;

  @Column({ length: 300, nullable: true })
  location: string;

  @Column({ name: 'starts_at', nullable: true })
  startsAt: Date;

  @Column({ name: 'ends_at', nullable: true })
  endsAt: Date;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
