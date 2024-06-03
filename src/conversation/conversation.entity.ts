import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id: number;

  @Field(() => [User])
  participants: User[];
}
