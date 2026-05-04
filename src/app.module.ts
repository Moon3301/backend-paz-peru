import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
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

    // Auth (preparado, sin lógica activa)
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

    // Módulos existentes
    UnitsModule,
    QuotationModule,
    ContactModule,
  ],
})
export class AppModule {}
