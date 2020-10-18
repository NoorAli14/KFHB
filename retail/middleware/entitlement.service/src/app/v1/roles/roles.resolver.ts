import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';

import { RoleService } from '@app/v1/roles/roles.service';
import { Role } from '@app/v1/roles/role.model';
import { RoleCreateInput, RoleInput } from '@app/v1/roles/role.dto';
import { KeyValInput } from '@common/inputs/key-val.input';
import { Module } from '@app/v1/modules/module.model';
import { STATUS } from '@common/constants';
import { CurrentUser, Fields } from '@common/decorators';
import { ICurrentUser } from '@common/interfaces';
import { RoleNotFoundException } from './exceptions';

@Resolver(Role)
export class RolesResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => [Role])
  async rolesList(
    @Fields() columns: string[],
    @CurrentUser() current_user: ICurrentUser,
    @Context() context: GraphQLExecutionContext,
  ): Promise<Role[]> {
    return this.roleService.list(current_user, columns, context['req'].query);
  }

  @Query(() => Role)
  async findRoleById(
    @Args('id') id: string,
    @Fields() columns: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<Role> {
    const role: Role = await this.roleService.findById(
      currentUser,
      id,
      columns,
    );
    if (!role) throw new RoleNotFoundException();
    return role;
  }

  @Query(() => [Role])
  async findRoleBy(
    @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
    @Fields() output: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<Role[]> {
    const roles = this.roleService.findByProperty(currentUser, checks, output);
    if (!roles) throw new RoleNotFoundException();
    return roles;
  }

  @Mutation(() => Role)
  async addRole(
    @Args('input') input: RoleCreateInput,
    @Fields() output: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<Role> {
    return this.roleService.create(currentUser, input, output);
  }

  @Mutation(() => Role)
  async updateRole(
    @Args('id') id: string,
    @Args('input') input: RoleInput,
    @Fields() output: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<Role> {
    const role: Role = await this.roleService.findById(currentUser, id, output);
    if (!role) throw new RoleNotFoundException(id);
    return this.roleService.update(currentUser, id, input, output);
  }

  @Mutation(() => Boolean)
  async deleteRole(
    @Args('id') id: string,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<boolean> {
    const role: Role = await this.roleService.findById(currentUser, id, ['id']);
    if (!role) throw new RoleNotFoundException(id);
    const input = { status: STATUS.INACTIVE };
    return this.roleService.delete(currentUser, id, input);
  }

  @ResolveField('modules', () => [Module])
  async getModules(
    @Parent() role: Role,
    @Loader('ModulesDataLoader')
    modulesLoader: DataLoader<Module['id'], Module>,
  ): Promise<any> {
    if (!role.id) return [];
    return modulesLoader.load(role.id);
  }
}
