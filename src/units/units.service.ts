import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { fetchUnitsHandler } from './handlers/fetch-units.handler';
import { groupUnitsHandler } from './handlers/group-units.handler';
import { GroupedUnits } from './interfaces/unit.interface';

@Injectable()
export class UnitsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getGroupedUnits(projectId: number): Promise<GroupedUnits> {
    const apiUrl = this.configService.getOrThrow<string>('SPERANT_UNITS_API_URL');
    const units = await fetchUnitsHandler(this.httpService, apiUrl, projectId);
    return groupUnitsHandler(units);
  }
}
