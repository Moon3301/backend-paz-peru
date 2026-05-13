import { IsEmail, IsString, IsIn, IsOptional, IsBoolean, Length } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  @Length(2, 150)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsIn(['admin', 'ventas', 'seo'])
  role?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
