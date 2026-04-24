import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactDto } from './dto/contact.dto';

const CONTACT_EMAIL = 'carlos_db_16@live.cl'; //postventa@paz.pe

@Injectable()
export class ContactService {
  
  constructor(private readonly configService: ConfigService) {}

  async send(dto: ContactDto): Promise<{ success: boolean; message: string }> {
    const smtpHost = this.configService.getOrThrow<string>('SMTP_HOST');
    const smtpPort = this.configService.get<number>('SMTP_PORT') ?? 25;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false,
      ignoreTLS: true,
      tls: { rejectUnauthorized: false },
    });

    const response = await transporter.sendMail({
      from: 'inmobiliariapaz@paz.cl',
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
