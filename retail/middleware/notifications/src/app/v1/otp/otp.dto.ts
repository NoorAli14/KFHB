import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('NewPostInput')
export class GenerateOTPInput {
  // @Field({ nullable: true })
  // @IsOptional()
  // @MaxLength(30)
  // description?: string;

  @Field()
  @Length(5, 255)
  user_id: string;
}

export class VerifyOTPInput {
  // @Field({ nullable: true })
  // @IsOptional()
  // @MaxLength(30)
  // description?: string;

  @Field()
  @Length(5, 255)
  user_id: string;

  @Field()
  @Length(5, 255)
  code: string;

  @Field()
  @Length(5, 255)
  source: string;
}
