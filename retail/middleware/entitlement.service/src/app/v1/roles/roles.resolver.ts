import {Resolver, Query, Mutation, Args, ResolveField, Parent, Context, GraphQLExecutionContext} from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';

import { RoleService } from "@app/v1/roles/roles.service";
import {Role, RoleWithPagination} from "@app/v1/roles/role.model";
import { RoleInput } from "@app/v1/roles/role.dto";
import { KeyValInput } from "@common/inputs/key-val.input";
import { Module } from "@app/v1/modules/module.model";
import {Fields} from '@common/decorators';
import {HttpException, HttpStatus} from '@nestjs/common';
import {MESSAGES, STATUS} from '@common/constants';
import {getMutateProps, getTenantID} from '@common/utilities';

@Resolver(Role)
export class RolesResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => RoleWithPagination)
  async rolesList(@Fields() columns: string[], @Context() context: GraphQLExecutionContext): Promise<RoleWithPagination> {
    return this.roleService.list(columns, context['req'].query);
  }

  @Query(() => Role)
  async findRoleById(@Args('id') id: string, @Fields() columns: string[]): Promise<Role> {
    const role: Role = await this.roleService.findById(id,columns);
    if(!role) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    return role;
  }

  @Query(() => [Role])
  async findRoleBy(
      @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
      @Fields() columns: string[]
  ): Promise<Role[]> {
    return this.roleService.findByProperty(checks, columns);
  }

  @Mutation(() => Role)
  async addRole(@Args('input') input: RoleInput,
                @Fields() columns: string[],
                @Context() context: GraphQLExecutionContext): Promise<Role> {
    input = getMutateProps('created', context['req'].headers, input);
    input['tenant_id'] = getTenantID(context['req'].headers);
    return this.roleService.create(input, columns);
  }

  @Mutation(() => Role)
  async updateRole(
    @Args('id') id: string,
    @Args('input') input: RoleInput,
    @Fields() columns: string[],
    @Context() context: GraphQLExecutionContext
  ): Promise<Role> {
    const role: Role = await this.roleService.findById(id,columns);
    if(!role) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    input = getMutateProps('updated', context['req'].headers, input);
    return this.roleService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteRole(@Args('id') id: string,
                   @Context() context: GraphQLExecutionContext): Promise<boolean> {
    const role: Role = await this.roleService.findById(id, ['id']);
    if(!role) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    let input = {status: STATUS.INACTIVE};
    input = getMutateProps('deleted', context['req'].headers, input);
    return this.roleService.delete(id, input);
  }

  @ResolveField('modules', returns => [Module])
  async getModules(@Parent() role: Role,
                 @Loader('ModulesDataLoader') modulesLoader: DataLoader<Module['id'], Module>) {
    if(!role.id) return [];
    return modulesLoader.load(role.id);
  }
}
