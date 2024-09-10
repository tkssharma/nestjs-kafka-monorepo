import { Consumer, ConsumerConfig, ConsumerSubscribeTopic, Kafka, KafkaMessage, Producer } from "kafkajs";
import { IProducer } from "./kafka.producer.service";
import { Logger } from "@nestjs/common";
import { IConsumer } from "./kafka.consumer.service";
import * as retry from 'async-retry';

export const sleep = (timeout: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, timeout));
};

export class KafkaConsumer implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(
    private readonly topic: ConsumerSubscribeTopic,
    config: ConsumerConfig,
    broker: string) {
    this.kafka = new Kafka({
      brokers: [broker]
    })
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`${topic}-${config.groupId}`)
  }
  async consume(onMessage: (message: KafkaMessage) => Promise<void>) {
    await this.consumer.subscribe(this.topic)
    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        this.logger.debug(`Processing message partition: ${partition}`);
        try {
          await retry(async () => onMessage(message), {
            retries: 3,
            onRetry: (error, attempt) =>
              this.logger.error(
                `Error consuming message, executing retry ${attempt}/3...`,
                error,
              ),
          });
        } catch (err) {
          // handle failure of message 
          // write then to DB table or log them 
          // better write to DATABASE 
        }
      },
    })
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka. trying again ...', err);
      await sleep(5000);
      await this.connect();
    }

  }
  async disconnect() {
    this.consumer.disconnect()
  }
}