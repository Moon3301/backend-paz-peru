import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type AdminRole = 'admin' | 'ventas' | 'seo';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ unique: true, length: 200 })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255, nullable: true, default: null })
  passwordHash: string | null;

  /** Rol del usuario: admin | ventas | seo */
  @Column({ type: 'varchar', length: 50, default: 'ventas' })
  role: AdminRole;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
