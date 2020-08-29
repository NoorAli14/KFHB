import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';

import { graphqlKeys } from '@common/utilities';
import { ModuleService } from '@app/v1/modules/module.service';
import { Module } from '@app/v1/modules/module.model';
import { ModuleInput } from '@app/v1/modules/module.dto';
import { KeyValInput } from '@common/inputs/key-val.input';
import { Permission } from '@app/v1/permissions/permission.model';
import { Fields } from '@common/decorators/';
import { User } from '@app/v1/users/user.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from '@common/constants';

@Resolver(Module)
export class ModuleResolver {
  constructor(private readonly moduleService: ModuleService) {}

  @Query(() => [Module])
  async modulesList(@Fields() columns: string[]): Promise<Module[]> {
    return this.moduleService.list(columns);
  }

  @Query(() => Module)
  async findModuleById(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<Module> {
    const module: Module = await this.moduleService.findById(id, columns);
    if (!module)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: MESSAGES.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
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
    @Args('input') input: ModuleInput,
    @Fields() columns: string[],
  ): Promise<Module> {
    return this.moduleService.create(input, columns);
  }

  @Mutation(() => Module)
  async updateModule(
    @Args('id') id: string,
    @Args('input') input: ModuleInput,
    @Fields() columns: string[],
  ): Promise<Module> {
    const module: Module = await this.moduleService.findById(id, ['id']);
    if (!module)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: MESSAGES.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
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
    if (!module.id) return [];
    let input: any = module.id;
    if (module['role_id']) {
      input = {
        module_id: module.id,
        role_id: module['role_id'],
      };
    }
    return permissionsLoader.load(input);
  }

  @ResolveField('sub_modules', returns => [Module])
  async getSubModules(
    @Parent() module: Module,
    @Loader('SubModulesDataLoader')
    subModulesLoader: DataLoader<Module['id'], Module>,
  ) {
    let input: any = module.id;
    if (module['role_id']) {
      input = {
        module_id: module.id,
        role_id: module['role_id'],
      };
    }
    return subModulesLoader.load(input);
  }
}
