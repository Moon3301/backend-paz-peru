import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SperantClientResponse } from '../interfaces/quotation.interfaces';

export async function checkClientHandler(
  httpService: HttpService,
  apiUrl: string,
  apiKey: string,
  dni: string,
): Promise<{ exists: boolean; clientId: number }> {
  const { data } = await firstValueFrom(
    httpService.get<SperantClientResponse>(`${apiUrl}clients?q=${dni}`, {
      headers: { Authorization: apiKey },
    }),
  );

  const clientId = data?.data?.attributes?.id ?? 0;
  return { exists: clientId > 0, clientId };
}
