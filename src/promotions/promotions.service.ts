import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private readonly repo: Repository<Promotion>,
  ) {}

  findAllPublic(): Promise<Promotion[]> {
    const now = new Date();
    return this.repo
      .createQueryBuilder('p')
      .where('p.isActive = :active', { active: true })
      .andWhere('(p.startsAt IS NULL OR p.startsAt <= :now)', { now })
      .andWhere('(p.endsAt IS NULL OR p.endsAt >= :now)', { now })
      .orderBy('p.sortOrder', 'ASC')
      .getMany();
  }

  findAll(): Promise<Promotion[]> {
    return this.repo.find({ order: { sortOrder: 'ASC', createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Promotion> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Promoción ${id} no encontrada`);
    return item;
  }

  create(dto: CreatePromotionDto): Promise<Promotion> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdatePromotionDto): Promise<Promotion> {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }
}
