import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { graphqlKeys } from '@common/utilities';
import {PermissionService} from "@app/v1/permissions/permissions.service";
import {Permission} from "@app/v1/permissions/permission.model";
import {PermissionInput} from "@app/v1/permissions/permission.dto";
import {KeyValInput} from "@common/inputs/key-val-input";

@Resolver(Permission)
export class PermissionsResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => [Permission])
  async permissionsList(@Info() info): Promise<Permission[]> {
    const keys = graphqlKeys(info);
    return this.permissionService.list(keys);
  }

  @Query(() => Permission)
  async findPermission(@Args('id') id: string, @Info() info): Promise<Permission> {
    const keys = graphqlKeys(info);
    return this.permissionService.findById(id, keys);
  }

  @Query(() => [Permission])
  async findPermissionBy(
    @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
    @Info() info
  ): Promise<Permission[]> {
    const keys = graphqlKeys(info);
    return this.permissionService.findByProperty(checks, keys);
  }

  @Mutation(() => Permission)
  async addPermission(@Args('input') input: PermissionInput, @Info() info): Promise<Permission> {
    const keys = graphqlKeys(info);
    return this.permissionService.create(input, keys);
  }

  @Mutation(() => Permission)
  async updatePermission(
    @Args('id') id: string,
    @Args('input') input: PermissionInput,
    @Info() info
  ): Promise<Permission> {
    const keys = graphqlKeys(info);
    return this.permissionService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deletePermission(@Args('id') id: string): Promise<boolean> {
    return this.permissionService.delete(id);
  }
}
