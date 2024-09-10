import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) { }

  public get root() {
    return {
      kakfa: this.kafka
    }
  }
  public get kafka() {
    return {
      broker: this.config.get("KAFKA_BROKER") || "",
      topic: this.config.get("KAFKA_TOPIC") || "",
    }
  }
}
