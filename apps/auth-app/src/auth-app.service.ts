import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
