import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { graphqlKeys } from '@common/utilities';
import {RoleModulePermission} from "@app/v1/role-module-permissions/role-module-permission.model";
import {RoleModulePermissionsService} from "@app/v1/role-module-permissions/role-module-permissions.service";
import {RoleModulePermissionInput} from "@app/v1/role-module-permissions/role-module-permission.dto";

@Resolver(RoleModulePermission)
export class RoleModulePermissionsResolver {
  constructor(private readonly roleModulePermissionService: RoleModulePermissionsService) {}

  @Query(() => [RoleModulePermission])
  async roleModulePermissionsList(@Info() info): Promise<RoleModulePermission[]> {
        const keys = graphqlKeys(info);
    return this.roleModulePermissionService.list(keys);
  }

  @Query(() => RoleModulePermission)
  async findRoleModulePermission(@Args('id') id: string, @Info() info): Promise<RoleModulePermission> {
        const keys = graphqlKeys(info);
    return this.roleModulePermissionService.findById(id, keys);
  }

  @Mutation(() => RoleModulePermission)
  async addRoleModulePermission(@Args('input') input: RoleModulePermissionInput, @Info() info): Promise<RoleModulePermission> {
        const keys = graphqlKeys(info);
    return this.roleModulePermissionService.create(input, keys);
  }

  @Mutation(() => RoleModulePermission)
  async updateRoleModulePermission(
    @Args('id') id: string,
    @Args('input') input: RoleModulePermissionInput,
    @Info() info
  ): Promise<RoleModulePermission> {
        const keys = graphqlKeys(info);
    return this.roleModulePermissionService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deleteRoleModulePermission(@Args('id') id: string): Promise<boolean> {
    return this.roleModulePermissionService.delete(id);
  }
}
