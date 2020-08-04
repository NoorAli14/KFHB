import {
  Resolver,
  Query,
  Mutation,
  Args,
  Info,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';
import { UserService } from './users.service';
import { NewUserInput } from './user.dto';
import { UserGQL } from './user.model';
import { PostGQL } from '@app/v1/posts/post.model';
import { graphqlKeys } from '@common/utilities';
import { PostLoader } from '../posts/posts.loader';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(UserGQL)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [UserGQL])
  async usersList(@Info() info): Promise<UserGQL[]> {
    const keys = graphqlKeys(info);
    return this.userService.list(keys);
  }

  @ResolveField(() => [PostGQL])
  public async posts(
    @Parent() user: UserGQL,
    @Loader(PostLoader.name) postLoader: DataLoader<PostGQL['id'], PostGQL>,
  ): Promise<any> {
    return postLoader.load(user.id);
  }

  @Query(() => UserGQL)
  public async findUser(
    @Args('id', ParseUUIDPipe) id: string,
    @Info() info,
  ): Promise<UserGQL> {
    const keys = graphqlKeys(info);
    return this.userService.findById(id, keys);
  }

  @Mutation(() => UserGQL)
  async addUser(
    @Args('input') input: NewUserInput,
    @Info() info,
  ): Promise<UserGQL> {
    const keys = graphqlKeys(info);

    return this.userService.create(input, keys);
  }
  @Mutation(() => UserGQL)
  async updateUser(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('input') input: NewUserInput,
    @Info() info,
  ): Promise<UserGQL> {
    const keys = graphqlKeys(info);
    return this.userService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.userService.delete(id);
  }
}
