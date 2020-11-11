import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { Fields } from '@rubix/common/decorators';
import { Post } from '@rubix/app/v1/posts/post.model';
import { User } from './user.model';
import { UserService } from './users.service';
import { NewUserInput, UpdateUserInput } from './user.dto';

@Resolver(User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users(@Fields() columns: string[]): Promise<User[]> {
    return this.userService.list(columns);
  }

  @ResolveField(() => [Post])
  posts(
    @Parent() user: User,
    @Loader('PostLoader') postLoader: DataLoader<Post['id'], Post>,
  ): Promise<any> {
    return postLoader.load(user.id);
  }

  @Query(() => User)
  async findUser(
    @Args('id', ParseUUIDPipe) id: string,
    @Fields() columns: string[],
  ): Promise<User> {
    const user: User = await this.userService.findById(id, columns);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Mutation(() => User)
  addUser(
    @Args('input') input: NewUserInput,
    @Fields() columns: string[],
  ): Promise<User> {
    return this.userService.create(input, columns);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('input') input: UpdateUserInput,
    @Fields() columns: string[],
  ): Promise<User> {
    return this.userService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const user: User = await this.userService.findById(id, ['id']);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userService.delete(id);
  }
}
