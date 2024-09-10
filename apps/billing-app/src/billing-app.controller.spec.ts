import { Test, TestingModule } from '@nestjs/testing';
import { BillingAppController } from './billing-app.controller';
import { BillingAppService } from './billing-app.service';

describe('BillingAppController', () => {
  let billingAppController: BillingAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BillingAppController],
      providers: [BillingAppService],
    }).compile();

    billingAppController = app.get<BillingAppController>(BillingAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(billingAppController.getHello()).toBe('Hello World!');
    });
  });
});
