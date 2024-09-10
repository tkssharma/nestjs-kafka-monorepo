import { AppConfigService } from "@app/config";
import { KafkaConsumerService } from "@app/kafka/kafka.consumer.service";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(
    private readonly config: AppConfigService,
    private readonly consumer: KafkaConsumerService) { }

  async onModuleInit() {
    await this.consumer.consume({
      topic: { topic: this.config.kafka.topic },
      config: { groupId: "test-consumer" },
      onMessage: async (message) => {
        console.log({ value: message.value.toString() })
      }
    })
  }

}