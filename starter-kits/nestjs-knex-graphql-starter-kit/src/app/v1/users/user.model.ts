import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Post } from '@rubix/app/v1/posts/post.model';
import { Comment } from '@rubix/app/v1/comments/comment.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field(() => [Post])
  posts?: Post[];

  @Field(() => [Comment])
  comments?: Comment[];

  @Field()
  created_on?: Date;

  @Field()
  updated_on?: Date;
}
