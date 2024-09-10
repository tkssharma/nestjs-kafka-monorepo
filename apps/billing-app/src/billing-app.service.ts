import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from './order-created';

@Injectable()
export class BillingAppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(data: OrderCreatedEvent) {
    console.log(data);
  }
}
