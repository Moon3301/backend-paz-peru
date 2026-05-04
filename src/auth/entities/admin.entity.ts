import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 200 })
  email: string;

  /**
   * Hash bcrypt. Vacío mientras auth no esté activo.
   */
  @Column({ name: 'password_hash', length: 255, nullable: true })
  passwordHash: string;

  @Column({ length: 50, default: 'admin' })
  role: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
