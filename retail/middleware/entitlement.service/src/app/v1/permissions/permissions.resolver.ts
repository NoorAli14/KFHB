import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PermissionService } from '@app/v1/permissions/permissions.service';
import { Permission } from '@app/v1/permissions/permission.model';
import { PermissionInput } from '@app/v1/permissions/permission.dto';
import { KeyValInput } from '@common/inputs/key-val.input';
import { Fields } from '@common/decorators/';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from '@common/constants';

@Resolver(Permission)
export class PermissionsResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => [Permission])
  async permissionsList(@Fields() columns: string[]): Promise<Permission[]> {
    return this.permissionService.list(columns);
  }

  @Query(() => Permission)
  async findPermissionById(
    @Args('id') id: string,
    @Fields() columns: string[],
  ): Promise<Permission> {
    const permission: Permission = await this.permissionService.findById(
      id,
      columns,
    );
    if (!permission)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: MESSAGES.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    return permission;
  }

  @Query(() => [Permission])
  async findPermissionBy(
    @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
    @Fields() columns: string[],
  ): Promise<Permission[]> {
    return this.permissionService.findByProperty(checks, columns);
  }

  @Mutation(() => Permission)
  async addPermission(
    @Args('input') input: PermissionInput,
    @Fields() columns: string[],
  ): Promise<Permission> {
    return this.permissionService.create(input, columns);
  }

  @Mutation(() => Permission)
  async updatePermission(
    @Args('id') id: string,
    @Args('input') input: PermissionInput,
    @Fields() columns: string[],
  ): Promise<Permission> {
    const permission: Permission = await this.permissionService.findById(id, [
      'id',
    ]);
    if (!permission)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: MESSAGES.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    return this.permissionService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deletePermission(@Args('id') id: string): Promise<boolean> {
    const permission: Permission = await this.permissionService.findById(id, [
      'id',
    ]);
    if (!permission)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: MESSAGES.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    return this.permissionService.delete(id);
  }
}
