import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin, AdminRole } from './entities/admin.entity';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

const BCRYPT_ROUNDS = 10;

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  // ── Login ─────────────────────────────────────────────────────────────────

  async login(dto: LoginDto): Promise<{ token: string; user: Omit<Admin, 'passwordHash'> }> {
    const admin = await this.adminRepo.findOne({ where: { email: dto.email } });

    if (!admin || !admin.isActive) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!admin.passwordHash) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const valid = await bcrypt.compare(dto.password, admin.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: JwtPayload = {
      sub:   admin.id,
      email: admin.email,
      role:  admin.role,
      name:  admin.name,
    };

    const token = this.jwtService.sign(payload);
    const { passwordHash: _, ...user } = admin;

    return { token, user };
  }

  // ── Me (perfil del token) ─────────────────────────────────────────────────

  async getMe(id: number): Promise<Omit<Admin, 'passwordHash'>> {
    const admin = await this.findOne(id);
    const { passwordHash: _, ...user } = admin;
    return user;
  }

  // ── CRUD de usuarios ──────────────────────────────────────────────────────

  async findAll(): Promise<Omit<Admin, 'passwordHash'>[]> {
    const admins = await this.adminRepo.find({ order: { createdAt: 'ASC' } });
    return admins.map(({ passwordHash: _, ...rest }) => rest);
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return admin;
  }

  async create(dto: CreateAdminDto): Promise<Omit<Admin, 'passwordHash'>> {
    const existing = await this.adminRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException(`Ya existe un usuario con email '${dto.email}'`);

    const passwordHash = await bcrypt.hash(dto.password, BCRYPT_ROUNDS);
    const admin = this.adminRepo.create({
      name:         dto.name,
      email:        dto.email,
      passwordHash,
      role:         dto.role as AdminRole,
      isActive:     dto.isActive ?? true,
    });

    const saved = await this.adminRepo.save(admin);
    const { passwordHash: _, ...user } = saved;
    return user;
  }

  async update(id: number, dto: UpdateAdminDto): Promise<Omit<Admin, 'passwordHash'>> {
    const admin = await this.findOne(id);

    if (dto.email && dto.email !== admin.email) {
      const existing = await this.adminRepo.findOne({ where: { email: dto.email } });
      if (existing) throw new ConflictException(`Ya existe un usuario con email '${dto.email}'`);
    }

    const { role, ...rest } = dto;
    Object.assign(admin, rest);
    if (role) admin.role = role as AdminRole;
    const saved = await this.adminRepo.save(admin);
    const { passwordHash: _, ...user } = saved;
    return user;
  }

  async remove(id: number): Promise<void> {
    const admin = await this.findOne(id);
    await this.adminRepo.remove(admin);
  }

  async toggleActive(id: number): Promise<Omit<Admin, 'passwordHash'>> {
    const admin = await this.findOne(id);
    admin.isActive = !admin.isActive;
    const saved = await this.adminRepo.save(admin);
    const { passwordHash: _, ...user } = saved;
    return user;
  }

  async changePassword(id: number, dto: ChangePasswordDto): Promise<void> {
    const admin = await this.findOne(id);
    admin.passwordHash = await bcrypt.hash(dto.newPassword, BCRYPT_ROUNDS);
    await this.adminRepo.save(admin);
  }
}
