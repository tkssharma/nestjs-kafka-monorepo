import { AppConfigService } from '@app/config';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { KafkaProducer } from './producer.service';

export interface IProducer {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  produce: (message: any) => Promise<void>;
}

@Injectable()
export class KafkaProducerService implements OnApplicationShutdown {
  private readonly producers = new Map<string, IProducer>

  constructor(private readonly configService: AppConfigService) { }

  async produce(message: any) {
    const topic = this.configService.kafka.topic;
    const producer = await this.getProducer(topic!);
    await producer.produce(message)
  }
  private async getProducer(topic: string) {
    let producer = this.producers.get(topic);
    if (!producer) {
      producer = new KafkaProducer(topic, this.configService.kafka.broker);
      await producer.connect()
      this.producers.set(topic, producer)
    }
    return producer;
  }
  onApplicationShutdown() {
  }
}
