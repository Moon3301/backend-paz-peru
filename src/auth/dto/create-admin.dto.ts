import { IsEmail, IsString, IsIn, IsOptional, IsBoolean, MinLength, Length } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @Length(2, 150)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['admin', 'ventas', 'seo'])
  role: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
