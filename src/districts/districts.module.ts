import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './entities/district.entity';
import { DistrictsService } from './districts.service';
import { DistrictsPublicController, DistrictsAdminController } from './districts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([District])],
  controllers: [DistrictsPublicController, DistrictsAdminController],
  providers: [DistrictsService],
  exports: [DistrictsService],
})
export class DistrictsModule {}
