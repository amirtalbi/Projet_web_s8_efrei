import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Message } from 'src/message/message.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id: number;

  @Field(() => [User])
  participants: User[];

  @Field(() => [Message], { nullable: true })
  messages?: Message[];
}
