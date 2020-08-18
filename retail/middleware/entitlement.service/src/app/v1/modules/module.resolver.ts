import {Resolver, Query, Mutation, Args, Info, ResolveField, Parent} from '@nestjs/graphql';
import { Loader } from 'nestjs-graphql-dataloader';

import { graphqlKeys } from '@common/utilities';
import {ModuleService} from "@app/v1/modules/module.service";
import {Module} from "@app/v1/modules/module.model";
import {ModuleInput} from "@app/v1/modules/module.dto";
import {KeyValInput} from "@common/inputs/key-val-input";
import {Permission} from "@app/v1/permissions/permission.model";
import * as DataLoader from "dataloader";
import {PermissionsDataLoader, SubModulesDataLoader} from "@core/dataloaders";

@Resolver(Module)
export class ModuleResolver {
  constructor(private readonly moduleService: ModuleService) {}

  @Query(() => [Module])
  async modulesList(@Info() info): Promise<Module[]> {
    const keys = graphqlKeys(info);
    return this.moduleService.list(keys);
  }

  @Query(() => Module)
  async findModule(@Args('id') id: string, @Info() info): Promise<Module> {
    const keys = graphqlKeys(info);
    return this.moduleService.findById(id, keys);
  }

  @Query(() => [Module])
  async findModuleBy(
    @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
    @Info() info
  ): Promise<Module[]> {
    const keys = graphqlKeys(info);
    return this.moduleService.findByProperty(checks, keys);
  }

  @Mutation(() => Module)
  async addModule(@Args('input') input: ModuleInput, @Info() info): Promise<Module> {
    const keys = graphqlKeys(info);
    return this.moduleService.create(input, keys);
  }

  @Mutation(() => Module)
  async updateModule(
    @Args('id') id: string,
    @Args('input') input: ModuleInput,
    @Info() info
  ): Promise<Module> {
    const keys = graphqlKeys(info);
    return this.moduleService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deleteModule(@Args('id') id: string): Promise<boolean> {
    return this.moduleService.delete(id);
  }

  @ResolveField('permissions', returns => [Permission])
  async getPermissions(@Parent() module: Module,
                       @Loader(PermissionsDataLoader.name) permissionsLoader: DataLoader<Permission['id'], Permission>) {
    const Ids: Array<string> = [];
    if(module.id) {
      Ids.push(module.id);
      return permissionsLoader.loadMany(Ids);
    } else {
      return [{}]
    }
  }

  @ResolveField('sub_modules', returns => [Module])
  async getSubModules(@Parent() module: Module,
                       @Loader(SubModulesDataLoader.name) subModulesLoader: DataLoader<Module['id'], Module>) {
    const Ids: Array<string> = [];
    if(module.id) {
      Ids.push(module.id);
      return subModulesLoader.loadMany(Ids);
    } else {
      return [{}]
    }
  }
}
