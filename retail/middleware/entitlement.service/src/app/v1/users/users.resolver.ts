import {
  Resolver,
  Query,
  Mutation,
  Args,
  Info,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import * as DataLoader from "dataloader"
import { Loader } from "nestjs-graphql-dataloader";

import { User } from "@app/v1/users/user.model";
import { UserService } from "@app/v1/users/users.service";
import { CreateUserInput, UpdateUserInput } from "@app/v1/users/user.dto";
import { graphqlKeys } from '@common/utilities';
import { Role } from "@app/v1/roles/role.model";
import { KeyValInput } from "@common/inputs/key-val-input";
import {RolesDataLoader} from "@core/dataloaders";

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

  @Query(() => [User])
  async findUserBy(
      @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
      @Info() info
  ): Promise<User[]> {
    const keys = graphqlKeys(info);
    return this.userService.findByProperty(checks, keys);
  }

  @Mutation(() => User)
  async addUser(@Args('input') input: CreateUserInput, @Info() info): Promise<User> {
    const keys = graphqlKeys(info);
    return this.userService.create(input, keys);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
    @Info() info
  ): Promise<User> {
    const keys = graphqlKeys(info);
    return this.userService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }

  @ResolveField('roles', returns => [Role])
  async getRoles(@Parent() user: User,
                 @Loader(RolesDataLoader.name) rolesLoader: DataLoader<Role['id'], Role>) {
    const Ids: Array<string> = [];
    if(user.id) {
      Ids.push(user.id);
      const results = await rolesLoader.loadMany(Ids);
      if(results[0]){
        if(Array.isArray(results[0])){
          return results[0]
        }
        return results
      }
    }
    return []
  }
}
