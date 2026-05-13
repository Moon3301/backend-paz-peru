import { IsString, IsOptional, IsBoolean, IsNumber, IsIn, Length, MaxLength } from 'class-validator';
import type { ProjectStatus } from '../entities/project.entity';

export class CreateProjectDto {
  @IsString()
  @Length(2, 100)
  slug: string;

  @IsString()
  @Length(2, 150)
  name: string;

  @IsString()
  @Length(2, 100)
  district: string;

  @IsIn(['LANZAMIENTO', 'EN CONSTRUCCIÓN', 'ENTREGA', 'AGOTADO', 'PRÓXIMAMENTE', 'ULTIMOS DEPAS'])
  status: ProjectStatus;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsNumber()
  sperantProjectId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  // ── SEO ──────────────────────────────────────────────────────────────────

  @IsOptional()
  @IsString()
  @MaxLength(200)
  metaTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  metaDescription?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  metaKeywords?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  ogImageUrl?: string;
}
