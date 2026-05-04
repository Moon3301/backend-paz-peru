import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
  ) {}

  findAllPublic(): Promise<Event[]> {
    return this.repo.find({
      where: { isActive: true },
      order: { startsAt: 'ASC', sortOrder: 'ASC' },
    });
  }

  findAll(): Promise<Event[]> {
    return this.repo.find({ order: { startsAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Event> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Evento ${id} no encontrado`);
    return item;
  }

  create(dto: CreateEventDto): Promise<Event> {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateEventDto): Promise<Event> {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.repo.remove(item);
  }
}
