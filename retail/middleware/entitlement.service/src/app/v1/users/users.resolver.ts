import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent, GraphQLExecutionContext, Context,
} from "@nestjs/graphql";
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';

import {User, UserWithPagination} from "@app/v1/users/user.model";
import { UserService } from "@app/v1/users/users.service";
import { CreateUserInput, UpdateUserInput } from "@app/v1/users/user.dto";
import { Role } from "@app/v1/roles/role.model";
import {KeyValInput} from "@common/inputs/key-val.input";
import {Module} from "@app/v1/modules/module.model";
import {Leave} from "@app/v1/leave/leave.model";
import {Fields} from "@common/decorators";
import {HttpException, HttpStatus} from '@nestjs/common';
import {MESSAGES} from '@common/constants';

@Resolver(User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserWithPagination)
  async usersList(@Fields() columns: string[], @Context() context: GraphQLExecutionContext): Promise<UserWithPagination> {
    return this.userService.list(columns, context['req'].query);
  }

  @Query(() => User)
  async findUserById(@Args('id') id: string, @Fields() columns: string[]): Promise<User> {
    const user: User = await this.userService.findById(id,columns);
    if(!user) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    return user;
  }

  @Mutation(() => User)
  async resetInvitationToken(@Args('id') id: string, @Fields() columns: string[]): Promise<User> {
    const user: User = await this.userService.findById(id,['id']);
    if(!user) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    return this.userService.resetInvitationToken(id, columns);
  }

  @Query(() => [User])
  async findUserBy(
      @Args('checks', { type: () => [KeyValInput] }) checks: KeyValInput[],
      @Fields() columns: string[]
  ): Promise<User[]> {
    return this.userService.findByProperty(checks, columns);
  }

  @Mutation(() => User)
  async addUser(@Args('input') input: CreateUserInput, @Fields() columns: string[]): Promise<User> {
    return this.userService.create(input, columns);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
    @Fields() columns: string[]
  ): Promise<User> {
    const user: User = await this.userService.findById(id,['id']);
    if(!user) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    return this.userService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    const user: User = await this.userService.findById(id,['id']);
    if(!user) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: MESSAGES.NOT_FOUND,
    }, HttpStatus.NOT_FOUND);
    return this.userService.delete(id);
  }

  @ResolveField('roles', returns => [Role])
  async getRoles(@Parent() user: User,
                 @Loader('RolesDataLoader') rolesLoader: DataLoader<Role['id'], Role>) {
    if(!user.id) return [];
    return rolesLoader.load(user.id);
  }

  @ResolveField('modules', returns => [Module])
  async getModules(@Parent() user: User,
                 @Loader('ModulesDataLoaderByUser') modulesLoader: DataLoader<Module['id'], Module>) {
    if(!user.id) return [];
    return modulesLoader.load(user.id);
  }

  @ResolveField('leaves', returns => [Leave])
  async getLeaves(@Parent() user: User,
                   @Loader('LeavesDataLoader') leavesLoader: DataLoader<Leave['id'], Leave>) {
    if(!user.id) return [];
    return leavesLoader.load(user.id);
  }
}
