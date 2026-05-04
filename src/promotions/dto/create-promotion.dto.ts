import { IsString, IsOptional, IsBoolean, IsNumber, IsDateString, Length } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  @Length(2, 200)
  title: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  district?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  badgeText?: string;

  @IsOptional()
  @IsString()
  projectLink?: string;

  @IsOptional()
  @IsString()
  disclaimer?: string;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsNumber()
  projectId?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  startsAt?: string;

  @IsOptional()
  @IsDateString()
  endsAt?: string;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
