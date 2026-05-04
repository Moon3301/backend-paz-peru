import { Controller, Get, Patch, Body } from '@nestjs/common';
import { CmsSettingsService } from './cms-settings.service';
import { Public } from '../auth/decorators/public.decorator';

/** Endpoint público — accesible sin autenticación */
@Public()
@Controller('settings')
export class CmsSettingsPublicController {
  constructor(private readonly service: CmsSettingsService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }
}

/** Endpoint de administración */
@Controller('admin/settings')
export class CmsSettingsAdminController {
  constructor(private readonly service: CmsSettingsService) {}

  @Patch()
  update(@Body() body: { settings: { key: string; value: string }[] }) {
    return this.service.upsertMany(body.settings);
  }
}
