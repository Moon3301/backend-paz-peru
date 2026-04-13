import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Unit } from '../interfaces/unit.interface';

export async function fetchUnitsHandler(
  httpService: HttpService,
  apiUrl: string,
  projectId: number,
): Promise<Unit[]> {
  const url = `${apiUrl}/api/sperant?idProyecto=${projectId}`;
  const { data } = await firstValueFrom(
    httpService.post<Unit[]>(url, { idProyecto: projectId }),
  );
  return data;
}
