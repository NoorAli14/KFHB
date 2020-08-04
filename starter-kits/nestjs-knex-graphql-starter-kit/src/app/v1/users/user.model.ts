import { ApiProperty } from '@nestjs/swagger';

export class User {
  readonly id: number;

  @ApiProperty({
    example: 'Faizan',
    description: 'First name of the user',
  })
  first_name: string;

  @ApiProperty({
    example: 'Ahmad',
    description: 'Last name of the user',
  })
  last_name: string;

  @ApiProperty({
    example: 'example@rubix.com',
    description: 'This is the email of the user.',
  })
  email: string;
}

// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';
import { PostGQL } from '@app/v1/posts/post.model';
import { CommentGQL } from '@app/v1/comments/comment.model';

@ObjectType()
export class UserGQL {
  @Field()
  id: string;

  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field(() => [PostGQL])
  posts?: PostGQL[];

  
  @Field(() => [CommentGQL])
  comments?: CommentGQL[];

  @Field()
  created_on?: Date;

  @Field()
  updated_on?: Date;
}
