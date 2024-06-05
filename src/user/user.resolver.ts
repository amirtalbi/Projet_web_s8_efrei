// user.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MemoryService } from '../memory/memory.service';
import { User } from './user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly memoryService: MemoryService) {}

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.memoryService.getAllUsers();
  }

  @Query(() => User)
  async getUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return this.memoryService.getUserById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('name') name: string): Promise<User> {
    return this.memoryService.createUser(name);
  }
}
