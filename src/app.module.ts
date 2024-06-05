import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConversationResolver } from './conversation/conversation.resolver';
import { RedisService } from './redis/redis.service';
import { AppService } from './app.service';
import { AppResolver } from './graphql/graphql.resolver';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { MemoryService } from './memory/memory.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: '/graphql',
    }),
  ],
  providers: [
    ConversationResolver,
    RedisService,
    AppService,
    AppResolver,
    UserService,
    UserResolver,
    MemoryService,
  ],
})
export class AppModule {}
