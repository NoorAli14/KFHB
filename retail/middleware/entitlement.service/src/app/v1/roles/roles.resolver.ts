import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';

import { RoleService } from "@app/v1/roles/roles.service";
import { Role } from "@app/v1/roles/role.model";
import { RoleInput } from "@app/v1/roles/role.dto";
import { KeyValInput } from "@common/inputs/key-val.input";
import { Module } from "@app/v1/modules/module.model";
import {Fields} from '@common/decorators';

@Resolver(Role)
export class RolesResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => [Role])
  async rolesList(@Fields() columns: string[]): Promise<Role[]> {
    return this.roleService.list(columns);
  }

  @Query(() => Role)
  async findRole(@Args('id') id: string, @Fields() columns: string[]): Promise<Role> {
    return this.roleService.findById(id, columns);
  }

  @Query(() => [Role])
  async findRoleBy(
      @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
      @Fields() columns: string[]
  ): Promise<Role[]> {
    return this.roleService.findByProperty(checks, columns);
  }

  @Mutation(() => Role)
  async addRole(@Args('input') input: RoleInput, @Fields() columns: string[]): Promise<Role> {
    return this.roleService.create(input, columns);
  }

  @Mutation(() => Role)
  async updateRole(
    @Args('id') id: string,
    @Args('input') input: RoleInput,
    @Fields() columns: string[]
  ): Promise<Role> {
    return this.roleService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteRole(@Args('id') id: string): Promise<boolean> {
    return this.roleService.delete(id);
  }

  @ResolveField('modules', returns => [Module])
  async getModules(@Parent() role: Role,
                 @Loader('ModulesDataLoader') modulesLoader: DataLoader<Module['id'], Module>) {
    if(!role.id) return [];
    return modulesLoader.load(role.id);
  }
}
