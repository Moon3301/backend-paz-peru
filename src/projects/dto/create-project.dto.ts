import { IsString, IsOptional, IsBoolean, IsNumber, IsIn, Length } from 'class-validator';
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

  @IsIn(['LANZAMIENTO', 'EN CONSTRUCCIÓN', 'ENTREGA', 'AGOTADO'])
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
}
