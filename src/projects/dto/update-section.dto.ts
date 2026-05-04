import { IsBoolean, IsIn, IsNumber, IsObject, IsOptional } from 'class-validator';
import type { SectionKey } from '../entities/project-section.entity';

export class UpdateSectionDto {
  @IsIn(['hero', 'promo_banner', 'specs', 'amenities', 'quoter', 'gallery', 'video', 'virtual_tour', 'ubication', 'executives'])
  sectionKey: SectionKey;

  @IsObject()
  config: Record<string, unknown>;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
