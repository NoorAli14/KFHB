import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './users.service';
import { NewUserInput } from './user.dto';
import { UserGQL } from './user.model';

@Resolver(UserGQL)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [UserGQL])
  async usersList(): Promise<UserGQL[]> {
    return this.userService.list();
  }

  @Query(() => UserGQL)
  async findUser(@Args('id') id: string): Promise<UserGQL> {
    return this.userService.findById(id);
  }

  @Mutation(() => UserGQL)
  async addUser(@Args('input') input: NewUserInput): Promise<UserGQL> {
    return this.userService.create(input);
  }
  @Mutation(() => UserGQL)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: NewUserInput,
  ): Promise<UserGQL> {
    return this.userService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }
}
