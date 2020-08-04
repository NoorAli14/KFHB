import { ApiProperty } from '@nestjs/swagger';

export class Post {
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
import { CommentGQL } from '@app/v1/comments/comment.model';
import { UserGQL } from '@app/v1/users/user.model';

@ObjectType()
export class PostGQL {
  @Field()
  id: string;

  @Field()
  user_id?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [CommentGQL])
  comments?: CommentGQL[];

  @Field(() => UserGQL)
  user?: UserGQL[];

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
