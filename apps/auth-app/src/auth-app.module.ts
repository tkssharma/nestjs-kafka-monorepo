import { Module } from '@nestjs/common';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from './auth-app.service';

@Module({
  imports: [],
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}
