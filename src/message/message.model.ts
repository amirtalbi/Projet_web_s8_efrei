import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { Conversation } from 'src/conversation/conversation.model';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: number;

  @Field(() => User)
  sender: User;

  @Field()
  content: string;

  @Field(() => Conversation)
  conversation: Conversation;
}
