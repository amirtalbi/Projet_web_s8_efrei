import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Conversation } from '../conversation/conversation.model';
import { User } from '../user/user.model';

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
