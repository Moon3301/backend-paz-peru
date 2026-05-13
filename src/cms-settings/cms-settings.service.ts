import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CmsSetting } from './entities/cms-setting.entity';

@Injectable()
export class CmsSettingsService {
  constructor(
    @InjectRepository(CmsSetting)
    private readonly repo: Repository<CmsSetting>,
  ) {}

  /** Devuelve todas las settings como mapa key→value */
  async getAll(): Promise<Record<string, string>> {
    const settings = await this.repo.find();
    return settings.reduce(
      (acc, s) => ({ ...acc, [s.key]: s.value }),
      {} as Record<string, string>,
    );
  }

  /** Inserta o actualiza (upsert) una lista de settings */
  async upsertMany(items: { key: string; value: string }[]): Promise<Record<string, string>> {
    if (!Array.isArray(items) || items.length === 0) return this.getAll();
    for (const item of items) {
      const existing = await this.repo.findOne({ where: { key: item.key } });
      if (existing) {
        existing.value = item.value;
        await this.repo.save(existing);
      } else {
        await this.repo.save(this.repo.create({ key: item.key, value: item.value }));
      }
    }
    return this.getAll();
  }
}
