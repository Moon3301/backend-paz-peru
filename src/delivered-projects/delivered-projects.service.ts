import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveredProject } from './entities/delivered-project.entity';
import { CreateDeliveredProjectDto } from './dto/create-delivered-project.dto';
import { UpdateDeliveredProjectDto } from './dto/update-delivered-project.dto';

@Injectable()
export class DeliveredProjectsService {
  constructor(
    @InjectRepository(DeliveredProject)
    private readonly repo: Repository<DeliveredProject>,
  ) {}

  // ── Público ───────────────────────────────────────────────────────────────

  findAllPublic(): Promise<DeliveredProject[]> {
    return this.repo.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC', name: 'ASC' },
    });
  }

  // ── Admin ─────────────────────────────────────────────────────────────────

  findAll(): Promise<DeliveredProject[]> {
    return this.repo.find({ order: { sortOrder: 'ASC', name: 'ASC' } });
  }

  async findOne(id: number): Promise<DeliveredProject> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Proyecto entregado ${id} no encontrado`);
    return item;
  }

  create(dto: CreateDeliveredProjectDto): Promise<DeliveredProject> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateDeliveredProjectDto): Promise<DeliveredProject> {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    item.isActive = false;
    await this.repo.save(item);
  }
}
