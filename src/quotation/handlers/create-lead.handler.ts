import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LeadPayload } from '../interfaces/quotation.interfaces';

export async function createLeadHandler(
  httpService: HttpService,
  apiUrl: string,
  apiKey: string,
  payload: LeadPayload,
): Promise<void> {
  await firstValueFrom(
    httpService.post(`${apiUrl}budgets`, payload, {
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
    }),
  );
}
