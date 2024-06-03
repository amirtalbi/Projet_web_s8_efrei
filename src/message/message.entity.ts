import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Conversation } from 'src/conversation/conversation.entity';

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
