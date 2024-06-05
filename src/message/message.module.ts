import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MemoryService } from 'src/memory/memory.service';
import { ConversationResolver } from '../conversation/conversation.resolver';
import { MessageConsumer } from './message.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [MessageConsumer, ConversationResolver, MemoryService],
})
export class MessageModule {}
