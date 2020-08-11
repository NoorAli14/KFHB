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
import { User } from '@rubix/app/v1/users/user.model';
import { Comment } from '@rubix/app/v1/comments/comment.model';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { NewPostInput, UpdatePostInput } from './post.dto';

@Resolver(Post)
export class PostsResolver {

  constructor(
    private readonly postService: PostsService,
  ) {}

  @ResolveField(() => [Comment])
  comments(
    @Parent() post: Post,
    @Loader('CommentLoader') commentLoader: DataLoader<Comment['id'], Comment>,
  ): Promise<any> {
    return commentLoader.load(post.id);
  }

  @Query(() => [Post])
  posts(@Fields() columns: string[]): Promise<Post[]> {
    return this.postService.list(columns);
  }

  @ResolveField(() => User)
  author(
    @Parent() post: Post,
    @Loader('UserLoader') userLoader: DataLoader<User['id'], User>,
  ): Promise<any> {
    return userLoader.load(post.user_id);
  }

  @Query(() => Post)
  async findPost(@Args('id', ParseUUIDPipe) id: string, @Fields() columns: string[]): Promise<Post> {
    const post: Post = await this.postService.findById(id, columns);
    if(!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Mutation(() => Post)
  addPost(
    @Args('input') input: NewPostInput,
    @Fields() columns: string[]
  ): Promise<Post> {
    return this.postService.create(input, columns);
  }

  @Mutation(() => Post)
  updatePost(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('input') input: UpdatePostInput,
    @Fields() columns: string[]
  ): Promise<Post> {
    return this.postService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const post: Post = await this.postService.findById(id, ['id']);
    if(!post) {
      throw new NotFoundException('Post not found');
    }
    return this.postService.delete(id);
  }
}
