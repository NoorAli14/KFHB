import { Resolver, Query, Mutation, Args,Info } from '@nestjs/graphql';
import { graphqlKeys } from '@common/utilities';
import {RoleService} from "@app/v1/roles/roles.service";
import {Role} from "@app/v1/roles/role.model";
import {RoleInput} from "@app/v1/roles/role.dto";

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
}
