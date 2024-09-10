import { Module } from '@nestjs/common';
import { BillingAppController } from './billing-app.controller';
import { BillingAppService } from './billing-app.service';

@Module({
  imports: [],
  controllers: [BillingAppController],
  providers: [BillingAppService],
})
export class BillingAppModule {}
