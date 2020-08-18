import { Resolver, Query, Mutation, Args,Info } from "@nestjs/graphql";

import { graphqlKeys } from "@common/utilities";
import { UserRole } from "@app/v1/user-roles/user-roles.model";
import { UserRolesService } from "@app/v1/user-roles/user-roles.service";
import { UserRoleInput } from "@app/v1/user-roles/user-roles.dto";
import { User } from "@app/v1/users/user.model";
import {KeyValInput} from "@common/inputs/key-val-input";

@Resolver(UserRole)
export class UserRolesResolver {
  constructor(private readonly userRoleService: UserRolesService) {}

  @Query(() => [UserRole])
  async userRolesList(@Info() info): Promise<UserRole[]> {
        const keys = graphqlKeys(info);
    return this.userRoleService.list(keys);
  }

  @Mutation(() => UserRole)
  async updateUserRole(
      @Args('id') id: string,
      @Args('input') input: UserRoleInput,
      @Info() info
  ): Promise<User> {
    const keys = graphqlKeys(info);
    return this.userRoleService.update(id, input, keys);
  }

  @Query(() => UserRole)
  async findUserRole(@Args('id') id: string, @Info() info): Promise<UserRole> {
        const keys = graphqlKeys(info);
    return this.userRoleService.findById(id, keys);
  }

  @Query(() => [UserRole])
  async findUserRoleBy(
    @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
    @Info() info
  ): Promise<UserRole[]> {
    const keys = graphqlKeys(info);
    return this.userRoleService.findByProperty(checks, keys);
  }

  @Mutation(() => UserRole)
  async addUserRole(@Args('input') input: UserRoleInput, @Info() info): Promise<UserRole> {
        const keys = graphqlKeys(info);
    return this.userRoleService.create(input, keys);
  }

  @Mutation(() => Boolean)
  async deleteUserRole(@Args('id') id: string): Promise<boolean> {
    return this.userRoleService.delete(id);
  }
}
