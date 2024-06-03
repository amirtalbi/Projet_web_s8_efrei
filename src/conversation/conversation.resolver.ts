import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Conversation } from './conversation.model';
import { Message } from 'src/message/message.model';

@Resolver(() => Conversation)
export class ConversationResolver {
  @Query(() => [Conversation])
  getUserConversations(
    @Args('userId', { type: () => Int }) userId: number,
  ): Conversation[] {
    // TODO
    return [];
  }

  @Query(() => [Message])
  getConversationMessages(
    @Args('conversationId', { type: () => Int }) conversationId: number,
  ): Message[] {
    // TODO
    return [];
  }

  @Mutation(() => Conversation)
  createConversation(
    @Args('userIds', { type: () => [Int] }) userIds: number[],
  ): Conversation {
    // TODO
    return new Conversation();
  }

  @Mutation(() => Message)
  sendMessage(
    @Args('conversationId', { type: () => Int }) conversationId: number,
    @Args('content') content: string,
  ): Message {
    // TODO
    return new Message();
  }
}
