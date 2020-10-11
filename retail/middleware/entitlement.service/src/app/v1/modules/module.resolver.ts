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

import { ModuleService } from '@app/v1/modules/module.service';
import { Module } from '@app/v1/modules/module.model';
import { ModuleCreateInput, ModuleInput } from '@app/v1/modules/module.dto';
import { KeyValInput } from '@common/inputs/key-val.input';
import { Permission } from '@app/v1/permissions/permission.model';
import { Fields } from '@common/decorators';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from '@common/constants';
import { getMutateProps } from '@common/utilities';
import { ModuleNotFoundException } from './exceptions';

@Resolver(Module)
export class ModuleResolver {
  constructor(private readonly moduleService: ModuleService) {}

  @Query(() => [Module])
  async modulesList(
    @Fields() columns: string[],
    @Context() context: GraphQLExecutionContext,
  ): Promise<Module[]> {
    return this.moduleService.list(columns, context['req'].query);
  }

  @Query(() => Module)
  async findModuleById(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<Module> {
    const module: Module = await this.moduleService.findById(id, columns);
    if (!module) throw new ModuleNotFoundException(id);
    return module;
  }

  @Query(() => [Module])
  async findModuleBy(
    @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
    @Fields() columns: string[],
  ): Promise<Module[]> {
    return this.moduleService.findByProperty(checks, columns);
  }

  @Mutation(() => Module)
  async addModule(
    @Args('input') input: ModuleCreateInput,
    @Fields() columns: string[],
    @Context() context: GraphQLExecutionContext,
  ): Promise<Module> {
    input = getMutateProps('created', context['req'].headers, input);
    return this.moduleService.create(input, columns);
  }

  @Mutation(() => Module)
  async updateModule(
    @Args('id') id: string,
    @Args('input') input: ModuleInput,
    @Fields() columns: string[],
  ): Promise<Module> {
    const module: Module = await this.moduleService.findById(id, ['id']);
    if (!module) throw new ModuleNotFoundException(id);
    return this.moduleService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteModule(@Args('id') id: string): Promise<boolean> {
    const module: Module = await this.moduleService.findById(id, ['id']);
    if (!module)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: MESSAGES.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    return this.moduleService.delete(id);
  }

  @ResolveField('permissions', returns => [Permission])
  async getPermissions(
    @Parent() module: Module,
    @Loader('PermissionsDataLoader')
    permissionsLoader: DataLoader<Permission['id'], Permission>,
  ) {
    return this.getData(module, permissionsLoader);
  }

  @ResolveField('sub_modules', returns => [Module])
  async getSubModules(
    @Parent() module: Module,
    @Loader('SubModulesDataLoader')
    subModulesLoader: DataLoader<Module['id'], Module>,
  ) {
    return this.getData(module, subModulesLoader);
  }

  async getData(module: Module, loader: any): Promise<any> {
    if (!module.id) return [];
    let input: any = module.id;
    if (module['role_id']) {
      input = {
        module_id: module.id,
        role_id: module['role_id'],
      };
    }
    let result: any = await loader.load(input);
    if (module['role_id'])
      result = result.filter(res => res.role_id == module['role_id']);
    return result;
  }
}
