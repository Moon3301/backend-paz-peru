import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  ClientPayload,
  SperantClientResponse,
} from '../interfaces/quotation.interfaces';

export async function createClientHandler(
  httpService: HttpService,
  apiUrl: string,
  apiKey: string,
  payload: ClientPayload,
): Promise<number> {
  const { data } = await firstValueFrom(
    httpService.post<SperantClientResponse>(`${apiUrl}clients`, payload, {
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
    }),
  );

  const clientId = data?.data?.attributes?.id;
  if (!clientId) {
    throw new Error('Error al crear el cliente en el CRM');
  }

  return clientId;
}
