import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { graphqlKeys } from '@common/utilities';
import {UserRole} from "@app/v1/user-roles/user-roles.model";
import {UserRolesService} from "@app/v1/user-roles/user-roles.service";
import {UserRoleInput} from "@app/v1/user-roles/user-roles.dto";

@Resolver(UserRole)
export class UserRolesResolver {
  constructor(private readonly userRoleService: UserRolesService) {}

  @Query(() => [UserRole])
  async userRolesList(@Info() info): Promise<UserRole[]> {
        const keys = graphqlKeys(info);
    return this.userRoleService.list(keys);
  }

  @Query(() => UserRole)
  async findUserRole(@Args('id') id: string, @Info() info): Promise<UserRole> {
        const keys = graphqlKeys(info);
    return this.userRoleService.findById(id, keys);
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
