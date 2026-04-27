import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ComplaintDto {
  // ── Identificación de hoja / fecha ──────────────────────────────────────────
  @IsNotEmpty()
  @IsString()
  complaintNumber: string;

  @IsNotEmpty()
  @IsString()
  fecha: string;

  // ── Empresa / Proyecto ──────────────────────────────────────────────────────
  @IsNotEmpty()
  @IsString()
  proyecto: string;

  @IsNotEmpty()
  @IsString()
  razonSocial: string;

  @IsNotEmpty()
  @IsString()
  ruc: string;

  // ── Sección 1: Datos del consumidor ─────────────────────────────────────────
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @IsNotEmpty()
  @IsString()
  domicilio: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  tipoDoc: string;

  @IsNotEmpty()
  @IsString()
  numeroDoc: string;

  // ── Menor de edad (opcional) ────────────────────────────────────────────────
  @IsOptional()
  @IsString()
  menorNombres?: string;

  @IsOptional()
  @IsString()
  menorApellidos?: string;

  @IsOptional()
  @IsString()
  menorTipoDoc?: string;

  @IsOptional()
  @IsString()
  menorNumeroDoc?: string;

  // ── Sección 2: Bien / Servicio ──────────────────────────────────────────────
  @IsNotEmpty()
  @IsString()
  bienServicio: string;

  @IsOptional()
  @IsString()
  monto?: string;

  // ── Sección 3: Tipo de reclamo ──────────────────────────────────────────────
  /** 'reclamo' | 'queja' */
  @IsNotEmpty()
  @IsString()
  tipoReclamo: string;

  // ── Sección 4: Detalle ──────────────────────────────────────────────────────
  @IsNotEmpty()
  @IsString()
  detalle: string;

  // ── Sección 5: Pedido del consumidor ────────────────────────────────────────
  @IsNotEmpty()
  @IsString()
  pedido: string;

  // ── Autorización ────────────────────────────────────────────────────────────
  @IsBoolean()
  autorizaDatos: boolean;
}