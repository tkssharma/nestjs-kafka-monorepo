import { Kafka, Producer } from "kafkajs";
import { IProducer } from "./kafka.producer.service";
import { Logger } from "@nestjs/common";

export const sleep = (timeout: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, timeout));
};

export class KafkaProducer implements IProducer {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger: Logger;

  constructor(private readonly topic: string, broker: string) {
    this.kafka = new Kafka({
      brokers: [broker]
    })
    this.producer = this.kafka.producer();
    this.logger = new Logger(topic)
  }

  async connect() {
    try {
      await this.producer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to Kafka. trying again ...', err);
      await sleep(5000);
      await this.connect();
    }

  }
  async disconnect() {
    this.producer.disconnect()
  }
  async produce(message: any) {
    await this.producer.send({ topic: this.topic, messages: [message] })
  }

}