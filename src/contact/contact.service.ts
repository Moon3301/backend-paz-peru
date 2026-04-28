import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactDto } from './dto/contact.dto';
import { ComplaintDto } from './dto/complaint.dto';

const CONTACT_EMAIL = 'postventa@paz.pe'; //postventa@paz.pe

@Injectable()
export class ContactService {

  constructor(private readonly configService: ConfigService) {}

  async send(dto: ContactDto): Promise<{ success: boolean; message: string }> {
    const smtpHost = this.configService.getOrThrow<string>('SMTP_HOST');
    const smtpPort = this.configService.get<number>('SMTP_PORT') ?? 25;
    const smtpUser = this.configService.getOrThrow<string>('USER_AD');
    const smtpPass = this.configService.getOrThrow<string>('PWD_AD');
    const smtpFrom = this.configService.getOrThrow<string>('SMTP_INFO');

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
      tls: { rejectUnauthorized: false },
    });

    try {
      await transporter.verify();
      console.log("Server is ready to take our messages");
    } catch (err) {
      console.error("Verification failed", err);
    }

    const response = await transporter.sendMail({
      from: smtpFrom,
      to: CONTACT_EMAIL,
      subject: `Consulta de contacto – ${dto.nombre} ${dto.apellido}`,
      html: buildContactEmail(dto),
    });

    console.log('Respuesta del correo: ', response);

    if (response.accepted.length === 0) {
      return { success: false, message: 'Error al enviar el mensaje.' };
    }

    return { success: true, message: 'Mensaje enviado correctamente.' };
  }

    async sendComplaint(dto: ComplaintDto): Promise<{ success: boolean; message: string }> {
    const smtpHost = this.configService.getOrThrow<string>('SMTP_HOST');
    const smtpPort = this.configService.get<number>('SMTP_PORT') ?? 25;
    const smtpUser = this.configService.getOrThrow<string>('USER_AD');
    const smtpPass = this.configService.getOrThrow<string>('PWD_AD');
    const smtpFrom = this.configService.getOrThrow<string>('SMTP_INFO');

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
      tls: { rejectUnauthorized: false },
    });

    try {
      await transporter.verify();
      console.log('Server is ready to take our messages');
    } catch (err) {
      console.error('Verification failed', err);
    }

    const tipoLabel = dto.tipoReclamo === 'queja' ? 'Queja' : 'Reclamo';
    
    const response = await transporter.sendMail({
      from: smtpFrom,
      to: CONTACT_EMAIL,
      cc: dto.email,
      subject: `[Libro de Reclamaciones] ${tipoLabel} – ${dto.complaintNumber} – ${dto.nombres} ${dto.apellidos}`,
      html: buildComplaintEmail(dto),
    });

    console.log('Respuesta del correo (complaint):', response);

    if (response.accepted.length === 0) {
      return { success: false, message: 'Error al enviar el reclamo.' };
    }

    return { success: true, message: 'Reclamo enviado correctamente.' };
  }
}


function buildContactEmail(dto: ContactDto): string {
  return `<!DOCTYPE html>
<html lang="es">
<head></head>
<body>
<center>
<table width="600" cellpadding="0" cellspacing="0" bgcolor="#f5f5f5" style="border-spacing:0;border-collapse:collapse;">
  <tr>
    <td style="text-align:center;padding:20px 0;">
      <img src="https://paz.pe/images/imagesCorreo/logo-4.png" alt="Paz Inmobiliaria">
    </td>
  </tr>
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" style="border-spacing:0;border-collapse:collapse;">
        <tr>
          <td width="30"></td>
          <td bgcolor="#222222" width="540">
            <img src="https://paz.pe/images/imagesCorreo/header.jpg" style="width:100%;">
          </td>
          <td width="30"></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" style="border-spacing:0;border-collapse:collapse;">
        <tr>
          <td width="30"></td>
          <td bgcolor="#222222" width="540" style="color:#ffffff;font-family:sans-serif;font-size:16px;">
            <table cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0;border-collapse:collapse;">
              <tr><td width="20"></td><td>&nbsp;</td><td width="20"></td></tr>
              <tr>
                <td width="20"></td>
                <td style="font-size:20px;font-weight:bold;">Nueva consulta de contacto</td>
                <td width="20"></td>
              </tr>
              <tr><td width="20"></td><td>&nbsp;</td><td width="20"></td></tr>

              <tr>
                <td width="20"></td>
                <td>
                  <table width="100%" cellpadding="6" cellspacing="0" style="border-spacing:0;border-collapse:collapse;font-family:sans-serif;font-size:15px;color:#ffffff;">
                    <tr>
                      <td width="160" style="color:#aaaaaa;">Proyecto</td>
                      <td><strong>${dto.project}</strong></td>
                    </tr>
                    <tr>
                      <td style="color:#aaaaaa;">DNI</td>
                      <td>${dto.dni}</td>
                    </tr>
                    <tr>
                      <td style="color:#aaaaaa;">Nombre</td>
                      <td>${dto.nombre} ${dto.apellido}</td>
                    </tr>
                    <tr>
                      <td style="color:#aaaaaa;">Email</td>
                      <td>${dto.email}</td>
                    </tr>
                    <tr>
                      <td style="color:#aaaaaa;">Teléfono</td>
                      <td>${dto.telefono}</td>
                    </tr>
                    <tr>
                      <td style="color:#aaaaaa;">Horario preferido</td>
                      <td>${dto.horario}</td>
                    </tr>
                    ${dto.comentario ? `
                    <tr>
                      <td style="color:#aaaaaa;vertical-align:top;">Comentario</td>
                      <td>${dto.comentario}</td>
                    </tr>` : ''}
                  </table>
                </td>
                <td width="20"></td>
              </tr>

              <tr><td width="20"></td><td>&nbsp;</td><td width="20"></td></tr>
            </table>
          </td>
          <td width="30"></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr><td>&nbsp;</td></tr>
  <tr>
    <td style="text-align:center;color:#222222;font-family:sans-serif;font-size:14px;">
      Paz Inmobiliaria S.A 20518023579 / Paz Real Estate S.A.C RUC 20605346716
    </td>
  </tr>
  <tr>
    <td style="text-align:center;color:#222222;font-family:sans-serif;font-size:14px;">
      Av. Camino real 390, Torre central - Oficina 1701, San Isidro
    </td>
  </tr>
  <tr><td>&nbsp;</td></tr>
</table>
</center>
</body>
</html>`;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* HTML del correo para el Libro de Reclamaciones                              */
/* ─────────────────────────────────────────────────────────────────────────── */
function buildComplaintEmail(dto: ComplaintDto): string {
  const tipoLabel  = dto.tipoReclamo === 'queja' ? 'QUEJA' : 'RECLAMO';
  const tipoColor  = dto.tipoReclamo === 'queja' ? '#c97a00' : '#b00020';

  const row = (label: string, value: string | undefined, highlight = false) =>
    value
      ? `<tr>
           <td width="180" style="color:#aaaaaa;vertical-align:top;padding:5px 6px;">${label}</td>
           <td style="color:${highlight ? '#ffcf6f' : '#ffffff'};padding:5px 6px;font-weight:${highlight ? 'bold' : 'normal'};">${value}</td>
         </tr>`
      : '';

  const section = (title: string, content: string) => `
    <tr><td colspan="2" style="padding:14px 6px 4px;">
      <span style="color:#ffcf6f;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">${title}</span>
    </td></tr>
    ${content}
    <tr><td colspan="2" style="border-bottom:1px solid #444;padding:0 6px 8px;"></td></tr>`;

  const menorSection = (dto.menorNombres || dto.menorApellidos)
    ? section('Datos del menor de edad representado',
        row('Nombres', dto.menorNombres) +
        row('Apellidos', dto.menorApellidos) +
        row('Tipo documento', dto.menorTipoDoc) +
        row('N° documento', dto.menorNumeroDoc))
    : '';

  return `<!DOCTYPE html>
<html lang="es">
<head></head>
<body>
<center>
<table width="620" cellpadding="0" cellspacing="0" bgcolor="#f0f0f0" style="border-spacing:0;border-collapse:collapse;font-family:sans-serif;">

  <!-- Logo -->
  <tr>
    <td style="text-align:center;padding:20px 0;">
      <img src="https://paz.pe/images/imagesCorreo/logo-4.png" alt="Paz Inmobiliaria">
    </td>
  </tr>

  <!-- Header banner -->
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" style="border-spacing:0;border-collapse:collapse;">
        <tr>
          <td width="30"></td>
          <td bgcolor="#222222" width="560">
            <img src="https://paz.pe/images/imagesCorreo/header.jpg" style="width:100%;">
          </td>
          <td width="30"></td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Título + badge de tipo -->
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" style="border-spacing:0;border-collapse:collapse;">
        <tr>
          <td width="30"></td>
          <td bgcolor="#1a1a1a" width="560" style="padding:18px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-spacing:0;">
              <tr>
                <td style="color:#ffffff;font-size:20px;font-weight:bold;">
                  📋 Libro de Reclamaciones
                </td>
                <td style="text-align:right;">
                  <span style="background:${tipoColor};color:#fff;font-size:12px;font-weight:bold;
                    padding:4px 12px;border-radius:4px;letter-spacing:1px;">${tipoLabel}</span>
                </td>
              </tr>
            </table>
          </td>
          <td width="30"></td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Cuerpo principal -->
  <tr>
    <td>
      <table cellpadding="0" cellspacing="0" style="border-spacing:0;border-collapse:collapse;">
        <tr>
          <td width="30"></td>
          <td bgcolor="#222222" width="560" style="color:#ffffff;font-family:sans-serif;font-size:15px;padding:0 0 16px;">
            <table cellpadding="0" cellspacing="0" width="100%"
                   style="border-spacing:0;border-collapse:collapse;padding:0 20px;">
              <tr><td style="height:12px;"></td></tr>

              <!-- Datos generales -->
              ${section('Identificación de la hoja',
                row('N° de hoja', dto.complaintNumber, true) +
                row('Fecha', dto.fecha)
              )}

              ${section('Empresa / Proyecto',
                row('Razón social', dto.razonSocial) +
                row('RUC', dto.ruc) +
                row('Proyecto', dto.proyecto, true)
              )}

              ${section('Datos del consumidor',
                row('Nombres', dto.nombres) +
                row('Apellidos', dto.apellidos) +
                row('Domicilio', dto.domicilio) +
                row('Email', dto.email) +
                row('Teléfono', dto.telefono) +
                row('Tipo documento', dto.tipoDoc) +
                row('N° documento', dto.numeroDoc)
              )}

              ${menorSection}

              ${section('Bien contratado / Servicio',
                row('Descripción', dto.bienServicio) +
                row('Monto', dto.monto)
              )}

              ${section(`Tipo: ${tipoLabel}`,
                `<tr><td colspan="2" style="padding:8px 6px;color:#ffcf6f;">
                  ${dto.tipoReclamo === 'queja'
                    ? 'Malestar o descontento respecto a la atención al público.'
                    : 'Disconformidad relacionada a los productos o servicios.'}
                </td></tr>`
              )}

              ${section('Detalle del reclamo / queja',
                `<tr><td colspan="2" style="padding:8px 6px;line-height:1.6;">${dto.detalle}</td></tr>`
              )}

              ${section('Pedido del consumidor',
                `<tr><td colspan="2" style="padding:8px 6px;line-height:1.6;">${dto.pedido}</td></tr>`
              )}

              <tr><td style="height:12px;"></td></tr>
            </table>
          </td>
          <td width="30"></td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Footer -->
  <tr><td>&nbsp;</td></tr>
  <tr>
    <td style="text-align:center;color:#555555;font-family:sans-serif;font-size:13px;">
      ${dto.razonSocial} — RUC ${dto.ruc}
    </td>
  </tr>
  <tr>
    <td style="text-align:center;color:#555555;font-family:sans-serif;font-size:13px;">
      Av. Aviación 2540, Piso 8, San Borja, Lima
    </td>
  </tr>
  <tr><td>&nbsp;</td></tr>

</table>
</center>
</body>
</html>`;
}
