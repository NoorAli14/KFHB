import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { graphqlKeys } from '@common/utilities';
import {RoleModulesService} from "@app/v1/role-modules/role-modules.service";
import {RoleModule} from "@app/v1/role-modules/role-module.model";
import {RoleModuleInput} from "@app/v1/role-modules/role-module.dto";

@Resolver(RoleModule)
export class RoleModulesResolver {
  constructor(private readonly roleModuleService: RoleModulesService) {}

  @Query(() => [RoleModule])
  async roleModulesList(@Info() info): Promise<RoleModule[]> {
        const keys = graphqlKeys(info);
    return this.roleModuleService.list(keys);
  }

  @Query(() => RoleModule)
  async findRoleModule(@Args('id') id: string, @Info() info): Promise<RoleModule> {
        const keys = graphqlKeys(info);
    return this.roleModuleService.findById(id, keys);
  }

  @Mutation(() => RoleModule)
  async addRoleModule(@Args('input') input: RoleModuleInput, @Info() info): Promise<RoleModule> {
        const keys = graphqlKeys(info);
    return this.roleModuleService.create(input, keys);
  }

  @Mutation(() => RoleModule)
  async updateRoleModule(
    @Args('id') id: string,
    @Args('input') input: RoleModuleInput,
    @Info() info
  ): Promise<RoleModule> {
        const keys = graphqlKeys(info);
    return this.roleModuleService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deleteRoleModule(@Args('id') id: string): Promise<boolean> {
    return this.roleModuleService.delete(id);
  }
}
