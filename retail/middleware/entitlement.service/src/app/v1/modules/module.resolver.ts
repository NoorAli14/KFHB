import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { graphqlKeys } from '@common/utilities';
import {ModuleService} from "@app/v1/modules/module.service";
import {Module} from "@app/v1/modules/module.model";
import {ModuleInput} from "@app/v1/modules/module.dto";

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
}
