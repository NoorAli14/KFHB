import {
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('NewCommentInput')
export class NewCommentInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  message?: string;

  @Field()
  @Length(5, 36)
  post_id: string;
}

@InputType('UpdateCommentInput')
export class UpdateCommentInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  message?: string;
}
