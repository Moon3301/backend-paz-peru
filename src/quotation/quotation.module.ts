import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { QuotationController } from './quotation.controller';
import { QuotationService } from './quotation.service';

@Module({
  imports: [HttpModule],
  controllers: [QuotationController],
  providers: [QuotationService],
})
export class QuotationModule {}
