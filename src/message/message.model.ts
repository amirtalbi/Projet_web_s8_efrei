// models/message.model.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Conversation } from 'src/conversation/conversation.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: number;

  @Field()
  content: string;

  @Field(() => User)
  sender: User;

  @Field(() => Conversation)
  conversation: Conversation;
}
