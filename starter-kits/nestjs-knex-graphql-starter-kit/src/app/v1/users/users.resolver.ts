import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { UserService } from './users.service';
import { NewUserInput } from './user.dto';
import { UserGQL } from './user.model';
import { graphqlKeys } from '@common/utilities';

@Resolver(UserGQL)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [UserGQL])
  async usersList(@Info() info: Record<string, any>): Promise<UserGQL[]> {
        const keys = graphqlKeys(info);

    return this.userService.list(keys);
  }

  @Query(() => UserGQL)
  async findUser(@Args('id') id: string, @Info() info: Record<string, any>): Promise<UserGQL> {
        const keys = graphqlKeys(info);

    return this.userService.findById(id, keys);
  }

  @Mutation(() => UserGQL)
  async addUser(@Args('input') input: NewUserInput, @Info() info: Record<string, any>): Promise<UserGQL> {
        const keys = graphqlKeys(info);

    return this.userService.create(input, keys);
  }
  @Mutation(() => UserGQL)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: NewUserInput,
    @Info() info: Record<string, any>
  ): Promise<UserGQL> {
        const keys = graphqlKeys(info);

    return this.userService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }
}
