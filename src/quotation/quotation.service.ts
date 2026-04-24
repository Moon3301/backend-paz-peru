import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SubmitQuotationDto } from './dto/submit-quotation.dto';
import { checkClientHandler } from './handlers/check-client.handler';
import { createClientHandler } from './handlers/create-client.handler';
import { createLeadHandler } from './handlers/create-lead.handler';
import { sendEmailHandler } from './handlers/send-email.handler';
import { ClientPayload } from './interfaces/quotation.interfaces';

const TEMPLATE_IDS: Record<number, number> = {
  28: 183, // Marena
  27: 169, // Lima 15
  26: 167, // Matiz
};

function getTemplateId(proyectoID: string): number {
  return TEMPLATE_IDS[parseInt(proyectoID)] ?? 1;
}

@Injectable()
export class QuotationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async submit(dto: SubmitQuotationDto): Promise<{ success: boolean; message: string }> {
    const apiUrl = this.configService.getOrThrow<string>('SPERANT_API_URL');
    const apiKey = this.configService.getOrThrow<string>('SPERANT_API_KEY');
    const smtpHost = this.configService.getOrThrow<string>('SMTP_HOST');
    const smtpPort = this.configService.get<number>('SMTP_PORT') ?? 25;
    const smtpUser = this.configService.getOrThrow<string>('USER_AD');
    const smtpPass = this.configService.getOrThrow<string>('PWD_AD');
    const smtpFrom = this.configService.getOrThrow<string>('SMTP_INFO');

    // 1. Check if client already exists in CRM
    const { exists } = await checkClientHandler(
      this.httpService,
      apiUrl,
      apiKey,
      dto.document,
    );

    if (exists) {
      return { success: false, message: 'Cliente ya se encuentra registrado.' };
    }

    // 2. Create client in CRM
    const clientPayload: ClientPayload = {
      project_id: dto.proyectoID,
      document: dto.document,
      fname: dto.fname,
      lname: dto.lname,
      email: dto.email,
      phone: dto.phone,
      observation: dto.observation,
      input_channel_id: 1,
      source_id: dto.source_id ?? '35',
      interest_type_id: 5,
      utm_source: dto.utm_source ?? 'organico',
      utm_medium: dto.utm_medium ?? 'proforma web',
      utm_campaign: dto.utm_campaign ?? 'organico',
    };

    const clientId = await createClientHandler(
      this.httpService,
      apiUrl,
      apiKey,
      clientPayload,
    );

    // 3. Create lead (budget) in CRM
    await createLeadHandler(this.httpService, apiUrl, apiKey, {
      client_id: clientId,
      unit_id: dto.unidadID,
      type_id: dto.tipologiaID,
      template_id: getTemplateId(dto.proyectoID),
      utm_source: dto.utm_source ?? 'organico',
      utm_medium: dto.utm_medium ?? 'proforma web',
      utm_campaign: dto.utm_campaign ?? 'organico',
    });

    // 4. Send confirmation email to client
    await sendEmailHandler(
      {
        toEmail: dto.email,
        firstName: dto.fname,
        lastName: dto.lname,
        unidad: dto.unidad,
        tipologia: dto.tipologia,
        proyecto: dto.proyecto,
      },
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass,
      smtpFrom,
    );

    return { success: true, message: 'Lead generado exitosamente en crm' };
  }
}
