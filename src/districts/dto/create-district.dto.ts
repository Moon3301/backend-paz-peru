import { IsOptional, IsString, IsNumber } from 'class-validator';


export class CreateDistrictDto {
  @IsString()
  label: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  mapImage?: string;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
