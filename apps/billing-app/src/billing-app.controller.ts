import { Controller, Get } from '@nestjs/common';
import { BillingAppService } from './billing-app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class BillingAppController {
  constructor(private readonly billingAppService: BillingAppService) { }

  @Get()
  getHello(): string {
    return this.billingAppService.getHello();
  }


  @EventPattern('order_created')
  handleOrderCreated(data: any) {
    console.log(data);
    this.billingAppService.handleOrderCreated(data);
  }
}
