import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //   @Query(() => [User])
  //   async getAllUsers(): Promise<User[]> {
  //     // Implémentez la logique pour récupérer tous les utilisateurs
  //     // Par exemple, utilisez Redis pour stocker et récupérer les utilisateurs
  //     const users: User[] = [];
  //     // Ajoutez la logique pour récupérer tous les utilisateurs
  //     return users;
  //   }

  @Query(() => User)
  async getUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('name') name: string): Promise<User> {
    return this.userService.createUser(name);
  }
}
