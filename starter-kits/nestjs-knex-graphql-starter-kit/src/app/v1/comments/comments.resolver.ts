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
import { Comment } from './comment.model';
import { CommentsService } from './comments.service';
import { NewCommentInput, UpdateCommentInput } from './comment.dto';

@Resolver(Comment)
export class CommentsResolver {
  constructor(private readonly commentService: CommentsService) {}

  @Query(() => [Comment])
  comments(@Fields() columns: string[]): Promise<Comment[]> {
    return this.commentService.list(columns);
  }

  @ResolveField(() => Post)
  post(
    @Parent() comment: Comment,
    @Loader('FindPostByIdLoader') postLoader: DataLoader<Post['id'], Post>,
  ): Promise<any> {
    return postLoader.load(comment.post_id);
  }

  @Query(() => Comment)
  async findComment(
    @Args('id', ParseUUIDPipe) id: string,
    @Fields() columns: string[],
  ): Promise<Comment> {
    const post: Comment = await this.commentService.findById(id, columns);
    if (!post) {
      throw new NotFoundException('Comment not found');
    }
    return post;
  }

  @Mutation(() => Comment)
  addComment(
    @Args('input') input: NewCommentInput,
    @Fields() columns: string[],
  ): Promise<Comment> {
    return this.commentService.create(input, columns);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('input') input: UpdateCommentInput,
    @Fields() columns: string[],
  ): Promise<Comment> {
    return this.commentService.update(id, input, columns);
  }

  @Mutation(() => Boolean)
  async deleteComment(@Args('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const comment: Comment = await this.commentService.findById(id, ['id']);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return this.commentService.delete(id);
  }
}
