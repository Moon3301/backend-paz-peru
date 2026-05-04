import { IsString, IsOptional, IsBoolean, IsArray, IsDateString, IsInt, Min, Length } from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  @Length(2, 200)
  slug: string;

  @IsString()
  @Length(2, 300)
  title: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @IsOptional()
  @IsString()
  @Length(0, 150)
  author?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  readTime?: number;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}
