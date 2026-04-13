import { Controller, Get, Query } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsQueryDto } from './dto/units-query.dto';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  getUnits(@Query() query: UnitsQueryDto) {
    return this.unitsService.getGroupedUnits(query.projectId);
  }
}
