import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubmitQuotationDto {
  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  fname: string;

  @IsNotEmpty()
  @IsString()
  lname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  observation: string;

  @IsNotEmpty()
  @IsString()
  proyecto: string;

  @IsNotEmpty()
  @IsString()
  proyectoID: string;

  @IsNotEmpty()
  @IsString()
  unidad: string;

  @IsNotEmpty()
  @IsString()
  tipologia: string;

  @IsNotEmpty()
  @IsString()
  unidadID: string;

  @IsNotEmpty()
  @IsString()
  tipologiaID: string;

  @IsOptional()
  @IsString()
  source_id?: string;

  @IsOptional()
  @IsString()
  utm_source?: string;

  @IsOptional()
  @IsString()
  utm_medium?: string;

  @IsOptional()
  @IsString()
  utm_campaign?: string;
}
