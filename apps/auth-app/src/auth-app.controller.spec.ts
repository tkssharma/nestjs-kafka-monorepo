import { Test, TestingModule } from '@nestjs/testing';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from './auth-app.service';

describe('AuthAppController', () => {
  let authAppController: AuthAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthAppController],
      providers: [AuthAppService],
    }).compile();

    authAppController = app.get<AuthAppController>(AuthAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authAppController.getHello()).toBe('Hello World!');
    });
  });
});
