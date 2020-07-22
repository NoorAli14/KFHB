import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { UserService } from './users.service';
import { UserInput } from './user.dto';
import { User } from './user.model';
import { graphqlKeys } from '@common/utilities';

@Resolver(User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async usersList(@Info() info): Promise<User[]> {
        const keys = graphqlKeys(info);
    return this.userService.list(keys);
  }

  @Query(() => User)
  async findUserById(@Args('id') id: string, @Info() info): Promise<User> {
        const keys = graphqlKeys(info);
    return this.userService.findById(id, keys);
  }

  @Query(() => User)
  async findUserByProperty(
      @Args('key', { type: () => String }) key: string,
      @Args('val', { type: () => String }) val: any,
      @Info() info
  ): Promise<User> {
    const keys = graphqlKeys(info);
    const condition = {};
    condition[key] = val;
    return this.userService.findByProperty(condition, keys);
  }

  @Mutation(() => User)
  async addUser(@Args('input') input: UserInput, @Info() info): Promise<User> {
        const keys = graphqlKeys(info);
    return this.userService.create(input, keys);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UserInput,
    @Info() info
  ): Promise<User> {
        const keys = graphqlKeys(info);
    return this.userService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }
}
