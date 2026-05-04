import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from './entities/district.entity';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private readonly repo: Repository<District>,
  ) {}

  /** Público: solo distritos activos */
  findAllPublic(): Promise<District[]> {
    return this.repo.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC', label: 'ASC' },
    });
  }

  /** Admin: todos los distritos */
  findAll(): Promise<District[]> {
    return this.repo.find({ order: { sortOrder: 'ASC', label: 'ASC' } });
  }

  async findOne(id: number): Promise<District> {
    const d = await this.repo.findOne({ where: { id } });
    if (!d) throw new NotFoundException(`District ${id} not found`);
    return d;
  }

  create(dto: CreateDistrictDto): Promise<District> {
    const d = this.repo.create({ ...dto, isActive: true });
    return this.repo.save(d);
  }

  async update(id: number, dto: UpdateDistrictDto): Promise<District> {
    const d = await this.findOne(id);
    Object.assign(d, dto);
    return this.repo.save(d);
  }

  async toggleActive(id: number): Promise<District> {
    const d = await this.findOne(id);
    d.isActive = !d.isActive;
    return this.repo.save(d);
  }

  async remove(id: number): Promise<void> {
    const d = await this.findOne(id);
    await this.repo.remove(d);
  }
}
