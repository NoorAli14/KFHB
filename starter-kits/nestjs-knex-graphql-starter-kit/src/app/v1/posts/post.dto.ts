import {
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('NewPostInput')
export class NewPostInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  description?: string;

  @Field()
  @Length(5, 255)
  user_id: string;
}

@InputType('UpdatePostInput')
export class UpdatePostInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  description?: string;
}
