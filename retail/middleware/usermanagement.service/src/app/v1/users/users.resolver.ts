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

import { UserService } from './users.service';
import {
  CreateUserInput,
  UpdateUserInput,
  UpdatePasswordInput,
  CheckAvailabilityInput,
} from './user.dto';
import { Role } from '@app/v1/roles/role.model';
import { KeyValInput } from '@common/inputs/key-val.input';
import { Module } from '@app/v1/modules/module.model';
import { Leave } from '@app/v1/leave/leave.model';
import { CurrentUser, Fields } from '@common/decorators';
import { ICurrentUser } from '@common/interfaces';
import { User, UsersWithPagination } from './user.model';
import { UserNotFoundException } from './exceptions';
import { PaginationParams, SortingParam } from '@common/dtos';
import { UsersFilterParams } from './dtos';

@Resolver(User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UsersWithPagination)
  async usersList(
    @Fields() output: string[],
    @Args('pagination', { nullable: true }) paginationParams: PaginationParams,
    @Args('filters', { nullable: true }) filteringParams: UsersFilterParams,
    @Args('sort_by', { nullable: true }) sortingParams: SortingParam,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<UsersWithPagination> {
    return this.userService.list(
      currentUser,
      paginationParams,
      filteringParams,
      sortingParams,
      output,
    );
  }

  @Query(() => User)
  async findUserById(
    @Args('id') id: string,
    @Fields() output: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<User> {
    const user: User = await this.userService.findById(currentUser, id, output);
    if (!user) throw new UserNotFoundException(id);
    return user;
  }

  @Query(() => [User])
  async findAvailableAgents(
    @Args('input') input: CheckAvailabilityInput,
    @CurrentUser() current_user: ICurrentUser,
  ): Promise<User[]> {
    return this.userService.findAvailableAgents(current_user, input);
  }

  @Mutation(() => User)
  async resetInvitationToken(
    @Args('id') id: string,
    @Fields() output: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<User> {
    const user: User = await this.userService.findById(currentUser, id, ['id', 'email']);
    if (!user) throw new UserNotFoundException(id);
    return this.userService.resetInvitationToken(currentUser, user, output);
  }

  @Mutation(() => User)
  async updatePassword(
    @Args('input') input: UpdatePasswordInput,
    @Fields() output: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<User> {
    const user: User = await this.userService.findById(
      currentUser,
      currentUser.id,
      ['id', 'email', 'password_digest'],
    );
    if (!user) throw new UserNotFoundException(currentUser.id);
    return this.userService.updateUserPassword(
      currentUser,
      user,
      input,
      output,
    );
  }

  @Query(() => [User])
  async findUserBy(
    @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
    @Fields() output: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<User[]> {
    return this.userService.findByProperty(currentUser, checks, output);
  }

  @Mutation(() => User)
  async addUser(
    @Args('input') input: CreateUserInput,
    @Fields() output: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<User> {
    return this.userService.create(currentUser, input, output);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
    @Fields() output: string[],
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<User> {
    const user: User = await this.userService.findById(currentUser, id, ['id', 'email']);
    if (!user) throw new UserNotFoundException(id);
    return this.userService.update(currentUser, user, input, output);
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id') id: string,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<boolean> {
    const user: User = await this.userService.findById(currentUser, id, ['id', 'email']);
    if (!user) throw new UserNotFoundException(id);
    return this.userService.delete(currentUser, user);
  }

  @ResolveField('roles', () => [Role])
  async getRoles(
    @Parent() user: User,
    @Loader('RolesDataLoader') rolesLoader: DataLoader<Role['id'], Role>,
  ): Promise<any> {
    if (!user.id) return [];
    return rolesLoader.load(user.id);
  }

  @ResolveField('modules', () => [Module])
  async getModules(
    @Parent() user: User,
    @Loader('ModulesDataLoaderByUser')
    modulesLoader: DataLoader<Module['id'], Module>,
  ): Promise<any> {
    if (!user.id) return [];
    return modulesLoader.load(user.id);
  }

  @ResolveField('leaves', () => [Leave])
  async getLeaves(
    @Parent() user: User,
    @Loader('LeavesDataLoader') leavesLoader: DataLoader<Leave['id'], Leave>,
  ): Promise<any> {
    if (!user.id) return [];
    return leavesLoader.load(user.id);
  }
}
