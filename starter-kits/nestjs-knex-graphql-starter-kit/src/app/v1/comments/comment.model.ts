import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from '@rubix/app/v1/posts/post.model';

@ObjectType()
export class Comment {
  @Field()
  id: string;

  @Field({ nullable: true })
  message?: string;

  @Field(() => Post)
  post: Post;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
