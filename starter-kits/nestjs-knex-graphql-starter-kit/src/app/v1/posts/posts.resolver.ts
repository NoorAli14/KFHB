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
import { User } from '@rubix/app/v1/users/user.model';
import { Comment } from '@rubix/app/v1/comments/comment.model';
import { graphqlKeys } from '@rubix/common/utilities';
import { PostsService } from './posts.service';
import { NewPostInput } from './post.dto';
import { Post } from './post.model';

@Resolver(Post)
export class PostsResolver {
  constructor(
    private readonly postService: PostsService,
  ) {}

  @ResolveField(() => [Comment])
  public async comments(
    @Parent() post: Post,
    @Loader('CommentLoader') commentLoader: DataLoader<Comment['id'], Comment>,
  ): Promise<any> {
    return commentLoader.load(post.id);
  }

  @Query(() => [Post])
  async posts(@Info() info): Promise<Post[]> {
    const keys = graphqlKeys(info);
    return this.postService.list(keys);
  }

  @ResolveField(() => User)
  public async author(
    @Parent() post: Post,
    @Loader('UserLoader') userLoader: DataLoader<User['id'], User>,
  ): Promise<any> {
    return userLoader.load(post.user_id);
  }

  @Query(() => Post)
  async findPost(@Args('id') id: string, @Info() info): Promise<Post> {
    const keys = graphqlKeys(info);
    return this.postService.findById(id, keys);
  }

  @Mutation(() => Post)
  async addPost(
    @Args('input') input: NewPostInput,
    @Info() info,
  ): Promise<Post> {
    const keys = graphqlKeys(info);
    return this.postService.create(input, keys);
  }
  @Mutation(() => Post)
  async updatePost(
    @Args('id') id: string,
    @Args('input') input: NewPostInput,
    @Info() info,
  ): Promise<Post> {
    const keys = graphqlKeys(info);
    return this.postService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id') id: string): Promise<boolean> {
    return this.postService.delete(id);
  }
}
