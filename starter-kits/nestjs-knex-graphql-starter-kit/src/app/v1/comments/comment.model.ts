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
@ObjectType()
export class CommentGQL {
  @Field()
  id: string;

  @Field({ nullable: true })
  message?: string;

  @Field(() => PostGQL)
  post: PostGQL;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
