import {Resolver, Query, Mutation, Args, Info, ResolveField, Parent} from '@nestjs/graphql';
import { Loader } from 'nestjs-graphql-dataloader';

import { graphqlKeys } from '@common/utilities';
import {RoleService} from "@app/v1/roles/roles.service";
import {Role} from "@app/v1/roles/role.model";
import {RoleInput} from "@app/v1/roles/role.dto";
import {KeyValInput} from "@common/inputs/key-val-input";
import {User} from "@app/v1/users/user.model";
import {RolesDataLoader} from "@app/v1/roles/roles.dataloader";
import * as DataLoader from "dataloader";
import {Module} from "@app/v1/modules/module.model";
import {ModulesDataLoader} from "@app/v1/modules/modules.dataloader";
import {Permission} from "@app/v1/permissions/permission.model";
import {PermissionsDataLoader} from "@app/v1/permissions/permissions.dataloader";

@Resolver(Role)
export class RolesResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => [Role])
  async rolesList(@Info() info): Promise<Role[]> {
        const keys = graphqlKeys(info);
    return this.roleService.list(keys);
  }

  @Query(() => Role)
  async findRole(@Args('id') id: string, @Info() info): Promise<Role> {
        const keys = graphqlKeys(info);
    return this.roleService.findById(id, keys);
  }

  @Query(() => [Role])
  async findRoleBy(
      @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
      @Info() info
  ): Promise<Role[]> {
    const keys = graphqlKeys(info);
    return this.roleService.findByProperty(checks, keys);
  }

  @Mutation(() => Role)
  async addRole(@Args('input') input: RoleInput, @Info() info): Promise<Role> {
        const keys = graphqlKeys(info);
    return this.roleService.create(input, keys);
  }

  @Mutation(() => Role)
  async updateRole(
    @Args('id') id: string,
    @Args('input') input: RoleInput,
    @Info() info
  ): Promise<Role> {
        const keys = graphqlKeys(info);
    return this.roleService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deleteRole(@Args('id') id: string): Promise<boolean> {
    return this.roleService.delete(id);
  }

  @ResolveField('modules', returns => [Module])
  async getModules(@Parent() role: Role,
                 @Loader(ModulesDataLoader.name) modulesLoader: DataLoader<Module['id'], Module>) {
    const keysAndID: Array<string> = [];
    keysAndID.push(role.id);
    return modulesLoader.loadMany(keysAndID);
  }

  @ResolveField('permissions', returns => [Permission])
  async getPermissions(@Parent() role: Role,
                       @Loader(PermissionsDataLoader.name) permissionsLoader: DataLoader<Permission['id'], Permission>) {
    const keysAndID: Array<string> = [];
    keysAndID.push(role.id);
    return permissionsLoader.loadMany(keysAndID);
  }
}
