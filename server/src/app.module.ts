import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppService } from './app.service';
import { ConversationResolver } from './conversation/conversation.resolver';
import { AppResolver } from './graphql/graphql.resolver';
import { MemoryService } from './memory/memory.service';
import { MessageModule } from './message/message.module';
import { RedisService } from './redis/redis.service';
import { UserResolver } from './user/user.resolver';
import { UserService } from './user/user.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: '/graphql',
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
    MessageModule,
  ],
  providers: [
    ConversationResolver,
    MemoryService,
    RedisService,
    AppService,
    AppResolver,
    UserService,
    UserResolver,
  ],
})
export class AppModule {}
