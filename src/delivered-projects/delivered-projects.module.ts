import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveredProject } from './entities/delivered-project.entity';
import { DeliveredProjectsService } from './delivered-projects.service';
import {
  DeliveredProjectsPublicController,
  DeliveredProjectsAdminController,
} from './delivered-projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveredProject])],
  controllers: [DeliveredProjectsPublicController, DeliveredProjectsAdminController],
  providers: [DeliveredProjectsService],
  exports: [DeliveredProjectsService],
})
export class DeliveredProjectsModule {}
