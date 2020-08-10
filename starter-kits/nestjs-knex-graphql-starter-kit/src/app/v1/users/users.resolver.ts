import {
  Resolver,
  Query,
  Mutation,
  Args,
  Info,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { Loader } from 'nestjs-dataloader';
import { Post } from '@rubix/app/v1/posts/post.model';
import { graphqlKeys } from '@rubix/common/utilities';
import { UserService } from './users.service';
import { NewUserInput } from './user.dto';
import { User } from './user.model';


@Resolver(User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users(@Info() info): Promise<User[]> {
    const columns = graphqlKeys(info);
    return this.userService.list(columns);
  }

  @ResolveField(() => [Post])
  posts(
    @Parent() user: User,
    @Loader('PostLoader') postLoader,
  ): Promise<any> {
    return postLoader.load(user.id);
  }

  @Query(() => User)
  async findUser(
    @Args('id', ParseUUIDPipe) id: string,
    @Info() info,
  ): Promise<User> {
    const columns = graphqlKeys(info);
    const user: User = await this.userService.findById(id, columns);
    if(!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Mutation(() => User)
  addUser(
    @Args('input') input: NewUserInput,
    @Info() info,
  ): Promise<User> {
    const columns = graphqlKeys(info);
    return this.userService.create(input, columns);
  }
  
  @Mutation(() => User)
  updateUser(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('input') input: NewUserInput,
    @Info() info,
  ): Promise<User> {
    const columns = graphqlKeys(info);
    return this.userService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const user: User = await this.userService.findById(id, ['id']);
    if(!user) {
      throw new NotFoundException();
    }
    return this.userService.delete(id);
  }
}
