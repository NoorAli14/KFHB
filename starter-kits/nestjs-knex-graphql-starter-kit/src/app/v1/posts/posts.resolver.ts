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
import { PostsService } from './posts.service';
import { NewPostInput } from './post.dto';
import { PostGQL } from './post.model';
import { UserGQL } from '@app/v1/users/user.model';
import { UserLoader } from '@app/v1/users/user.loader';
import { CommentLoader } from '@app/v1/comments/comment.loader';
import { CommentGQL } from '@app/v1/comments/comment.model';
import { graphqlKeys } from '@common/utilities';
import { UserService } from '@app/v1/users/users.service';
import { CommentsService } from '@app/v1/comments/comments.service';

@Resolver(PostGQL)
export class PostsResolver {
  constructor(
    private readonly postService: PostsService,
    private readonly userService: UserService,
    private readonly commentService: CommentsService,
  ) {}

  // @ResolveField(() => [CommentGQL])
  // async comments(@Parent() post, @Info() info): Promise<CommentGQL[]> {
  //   const { id } = post;
  //   console.log(post);
  //   const keys = graphqlKeys(info);
  //   return this.commentService.findByPostId(id, keys);
  // }

  @ResolveField(() => [CommentGQL])
  public async comments(
    @Parent() post: PostGQL,
    @Loader(CommentLoader.name) commentLoader: DataLoader<CommentGQL['id'], CommentGQL>,
  ): Promise<any> {
    return commentLoader.load(post.id);
  }

  @Query(() => [PostGQL])
  async postsList(@Info() info): Promise<PostGQL[]> {
    const keys = graphqlKeys(info);
    return this.postService.list(keys);
  }
  // @ResolveField(() => UserGQL)
  // async user(@Parent() post, @Info() info) {
  //   const { user_id } = post;
  //   console.log(post);
  //   const keys = graphqlKeys(info);
  //   return this.userService.findById(user_id, keys);
  // }

  @ResolveField(() => UserGQL)
  public async user(
    @Parent() post: PostGQL,
    @Loader(UserLoader.name) userLoader: DataLoader<UserGQL['id'], UserGQL>,
  ): Promise<any> {
    return userLoader.load(post.user_id);
  }

  @Query(() => PostGQL)
  async findPost(@Args('id') id: string, @Info() info): Promise<PostGQL> {
    const keys = graphqlKeys(info);
    return this.postService.findById(id, keys);
  }

  @Mutation(() => PostGQL)
  async addPost(
    @Args('input') input: NewPostInput,
    @Info() info,
  ): Promise<PostGQL> {
    const keys = graphqlKeys(info);
    return this.postService.create(input, keys);
  }
  @Mutation(() => PostGQL)
  async updatePost(
    @Args('id') id: string,
    @Args('input') input: NewPostInput,
    @Info() info,
  ): Promise<PostGQL> {
    const keys = graphqlKeys(info);
    return this.postService.update(id, input, keys);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id') id: string): Promise<boolean> {
    return this.postService.delete(id);
  }
}
