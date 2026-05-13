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

  /**
   * Acepta dos formatos de body:
   *   { settings: [{ key, value }, ...] }   ← formato del panel Angular
   *   [{ key, value }, ...]                  ← array directo (compatibilidad)
   */
  @Patch()
  update(@Body() body: { settings?: { key: string; value: string }[] } | { key: string; value: string }[]) {
    const items: { key: string; value: string }[] = Array.isArray(body)
      ? body
      : (body as any)?.settings ?? [];
    return this.service.upsertMany(items);
  }
}
