import * as nodemailer from 'nodemailer';
import { EmailPayload } from '../interfaces/quotation.interfaces';

export async function sendEmailHandler(
  payload: EmailPayload,
  smtpHost: string,
  smtpPort: number,
): Promise<void> {
  const { toEmail, firstName, lastName, unidad, tipologia, proyecto } = payload;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: false,
    ignoreTLS: true,
    tls: { rejectUnauthorized: false },
  });

  await transporter.sendMail({
    from: 'inmobiliariapaz@paz.cl',
    to: toEmail,
    bcc: 'desarrollopaz@inventa.cl',
    subject: 'Gracias por tu interés en Paz Inmobiliaria',
    html: buildEmailTemplate(firstName, lastName, unidad, tipologia, proyecto),
  });
}

function buildEmailTemplate(
  firstName: string,
  lastName: string,
  unidad: string,
  tipologia: string,
  proyecto: string,
): string {
  return `<!DOCTYPE html>
<html lang="es">
<head></head>
<body>
<center>
<table width="600" cellpadding="0" cellspacing="0" bgcolor="#f5f5f5" style="border-spacing:0;border-collapse:collapse;">
  <tr>
    <td style="text-align:center;">
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
          <td bgcolor="#222222" width="540" style="color:#ffffff;font-family:sans-serif;font-size:18px;">
            <table cellpadding="0" cellspacing="0" style="border-spacing:0;border-collapse:collapse;">
              <tr><td width="20"></td><td>&nbsp;</td><td width="20"></td></tr>
              <tr>
                <td width="20"></td>
                <td>Estimado/a <strong>${firstName} ${lastName}</strong></td>
                <td width="20"></td>
              </tr>
              <tr><td width="20"></td><td>&nbsp;</td><td width="20"></td></tr>
              <tr>
                <td width="20"></td>
                <td>
                  Gracias por tu interés en el departamento <strong>${unidad}</strong>,
                  tipología <strong>${tipologia}</strong> en nuestro proyecto
                  <strong>${proyecto}</strong> de Paz Inmobiliaria.
                </td>
                <td width="20"></td>
              </tr>
              <tr><td width="20"></td><td>&nbsp;</td><td width="20"></td></tr>
              <tr>
                <td width="20"></td>
                <td>Muy pronto, uno de nuestros asesores se pondrá en contacto con usted para atenderlo y brindarle más información.</td>
                <td width="20"></td>
              </tr>
              <tr><td width="20"></td><td>&nbsp;</td><td width="20"></td></tr>
              <tr><td width="20"></td><td>Saludos,</td><td width="20"></td></tr>
              <tr><td width="20"></td><td>Paz Inmobiliaria.</td><td width="20"></td></tr>
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
  <tr>
    <td style="text-align:center;">
      <a href="https://www.facebook.com/Pazinmobiliariaperu">
        <img src="https://paz.pe/images/imagesCorreo/icono_fb.png" style="margin-right:15px;">
      </a>
      <a href="https://www.instagram.com/pazinmobiliariaperu/">
        <img src="https://paz.pe/images/imagesCorreo/icono_ig.png" style="margin-right:15px;">
      </a>
      <a href="https://www.youtube.com/channel/UCrzmQ_g5EZqsy0GiDlWVeJQ">
        <img src="https://paz.pe/images/imagesCorreo/icono_yt.png" style="margin-right:15px;">
      </a>
      <a href="https://www.linkedin.com/company/paz-inmobiliaria/">
        <img src="https://paz.pe/images/imagesCorreo/icono_in.png">
      </a>
    </td>
  </tr>
  <tr><td>&nbsp;</td></tr>
</table>
</center>
</body>
</html>`;
}
