import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsSetting } from './entities/cms-setting.entity';
import { CmsSettingsService } from './cms-settings.service';
import { CmsSettingsPublicController, CmsSettingsAdminController } from './cms-settings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CmsSetting])],
  controllers: [CmsSettingsPublicController, CmsSettingsAdminController],
  providers: [CmsSettingsService],
  exports: [CmsSettingsService],
})
export class CmsSettingsModule {}
