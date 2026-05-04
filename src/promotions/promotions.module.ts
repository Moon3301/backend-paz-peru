import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { PromotionsService } from './promotions.service';
import { PromotionsPublicController, PromotionsAdminController } from './promotions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion])],
  controllers: [PromotionsPublicController, PromotionsAdminController],
  providers: [PromotionsService],
})
export class PromotionsModule {}
