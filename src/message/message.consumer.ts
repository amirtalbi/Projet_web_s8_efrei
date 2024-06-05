import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('message-queue')
export class MessageConsumer {
  @Process('send-message')
  async handleSendMessage(job: Job) {
    const { content } = job.data;
    // Logique pour sauvegarder le message
    console.log(`Message reçu: ${content}`);
  }
}
