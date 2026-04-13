import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';

@Module({
  imports: [HttpModule],
  controllers: [UnitsController],
  providers: [UnitsService],
})
export class UnitsModule {}
