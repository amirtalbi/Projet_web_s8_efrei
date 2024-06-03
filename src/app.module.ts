import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConversationResolver } from './conversation/conversation.resolver';
import { User } from './user/user.model'; // Importez vos modèles
import { Conversation } from './conversation/conversation.model';
import { Message } from './message/message.model';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [ConversationResolver],
})
export class AppModule {}
