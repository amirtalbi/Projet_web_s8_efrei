import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConversationResolver } from '../conversation/conversation.resolver';
import { MemoryService } from '../memory/memory.service';
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
