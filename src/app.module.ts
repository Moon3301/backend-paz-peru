import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { MediaModule } from './media/media.module';
import { ProjectsModule } from './projects/projects.module';
import { PromotionsModule } from './promotions/promotions.module';
import { EventsModule } from './events/events.module';
import { BlogModule } from './blog/blog.module';
import { UnitsModule } from './units/units.module';
import { QuotationModule } from './quotation/quotation.module';
import { ContactModule } from './contact/contact.module';
import { DeliveredProjectsModule } from './delivered-projects/delivered-projects.module';
import { DistrictsModule } from './districts/districts.module';
import { CmsSettingsModule } from './cms-settings/cms-settings.module';
import { DevToolsModule } from './dev-tools/dev-tools.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Sirve los archivos subidos como estáticos en /uploads/*
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: { index: false },
    }),

    // Base de datos
    DatabaseModule,

    // Auth — JWT global
    AuthModule,

    // Módulos CMS
    MediaModule,
    ProjectsModule,
    PromotionsModule,
    EventsModule,
    BlogModule,
    DeliveredProjectsModule,
    DistrictsModule,
    CmsSettingsModule,
    DevToolsModule,

    // Módulos existentes
    UnitsModule,
    QuotationModule,
    ContactModule,
  ],
  providers: [
    // AuthGuard global: todas las rutas requieren JWT salvo @Public()
    { provide: APP_GUARD, useClass: AuthGuard },
    // RolesGuard global: aplica restricción de rol donde se use @Roles()
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
