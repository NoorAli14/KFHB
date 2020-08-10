import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from '@app/v1/comments/comment.model';
import { User } from '@app/v1/users/user.model';

@ObjectType()
export class Post {
  @Field()
  id: string;

  @Field()
  user_id?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Comment])
  comments?: Comment[];

  @Field(() => User)
  author?: User[];

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
