import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UnitsModule } from './units/units.module';
import { QuotationModule } from './quotation/quotation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UnitsModule,
    QuotationModule,
  ],
})
export class AppModule {}
