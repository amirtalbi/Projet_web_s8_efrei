// conversation.resolver.ts
import { InjectQueue } from '@nestjs/bull';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Queue } from 'bull';
import { Message } from 'src/message/message.model';
import { MemoryService } from '../memory/memory.service';
import { Conversation } from './conversation.model';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
    private memoryService: MemoryService,
    @InjectQueue('message-queue') private messageQueue: Queue,
  ) {}

  @Query(() => [Conversation])
  async getUserConversations(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Conversation[]> {
    return this.memoryService.getUserConversations(userId);
  }

  @Query(() => [Message])
  async getConversationMessages(
    @Args('conversationId', { type: () => Int }) conversationId: number,
  ): Promise<Message[]> {
    return this.memoryService.getConversationMessages(conversationId);
  }

  @Mutation(() => Conversation)
  async createConversation(
    @Args('userIds', { type: () => [Int] }) userIds: number[],
  ): Promise<Conversation> {
    return this.memoryService.createConversation(userIds);
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('conversationId', { type: () => Int }) conversationId: number,
    @Args('content') content: string,
    @Args('senderId', { type: () => Int }) senderId: number,
  ): Promise<Message> {
    await this.messageQueue.add('send-message', {
      conversationId,
      content,
      senderId,
    });
    return this.memoryService.sendMessage(conversationId, content, senderId);
  }
}
