import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Conversation } from './conversation.model';
import { RedisService } from 'src/redis/redis.service';
import { UserService } from 'src/user/user.service';
import { Message } from 'src/message/message.model';
import { User } from 'src/user/user.model';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
    private redisService: RedisService,
    private userService: UserService,
  ) {}

  @Query(() => [Conversation])
  async getUserConversations(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Conversation[]> {
    const data = await this.redisService.get(`user:${userId}:conversations`);
    return data || [];
  }

  @Query(() => [Message])
  async getConversationMessages(
    @Args('conversationId', { type: () => Int }) conversationId: number,
  ): Promise<Message[]> {
    const data = await this.redisService.get(
      `conversation:${conversationId}:messages`,
    );
    return data || [];
  }

  @Mutation(() => Conversation)
  async createConversation(
    @Args('userIds', { type: () => [Int] }) userIds: number[],
  ): Promise<Conversation> {
    const participants: User[] = await Promise.all(
      userIds.map(async (id) => await this.userService.getUserById(id)),
    );
    const newConversation = { id: Date.now(), participants };
    await Promise.all(
      userIds.map((userId) =>
        this.redisService.set(`user:${userId}:conversations`, newConversation),
      ),
    );
    return newConversation;
  }

  @Mutation(() => Message)
  async sendMessage(
    @Args('senderId', { type: () => Int }) senderId: number,
    @Args('receiverId', { type: () => Int }) receiverId: number,
    @Args('conversationId', { type: () => Int }) conversationId: number,
    @Args('content') content: string,
  ): Promise<Message> {
    const sender = await this.userService.getUserById(senderId);
    const receiver = await this.userService.getUserById(receiverId);
    const conversation: Conversation = await this.redisService.get(
      `conversation:${conversationId}`,
    );
    const newMessage: Message = {
      id: Date.now(),
      sender,
      receiver,
      content,
      conversation,
    };
    const messages = await this.redisService.get(
      `conversation:${conversationId}:messages`,
    );
    const updatedMessages = messages ? [...messages, newMessage] : [newMessage];
    await this.redisService.set(
      `conversation:${conversationId}:messages`,
      updatedMessages,
    );
    return newMessage;
  }
}
