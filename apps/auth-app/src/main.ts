import { NestFactory } from '@nestjs/core';
import { AuthAppModule } from './auth-app.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthAppModule);
  await app.listen(3011);
}
bootstrap();
