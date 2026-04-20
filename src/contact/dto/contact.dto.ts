import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ContactDto {
  @IsNotEmpty()
  @IsString()
  project: string;

  @IsNotEmpty()
  @IsString()
  dni: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  horario: string;

  @IsOptional()
  @IsString()
  comentario?: string;

  @IsBoolean()
  acceptTerms: boolean;

  @IsBoolean()
  acceptPrivacy: boolean;
}
