import { Body, Controller, Post } from '@nestjs/common';
import { SubmitQuotationDto } from './dto/submit-quotation.dto';
import { QuotationService } from './quotation.service';
import { Public } from '../auth/decorators/public.decorator';

@Public()
@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post('submit')
  submit(@Body() dto: SubmitQuotationDto) {
    return this.quotationService.submit(dto);
  }
}
