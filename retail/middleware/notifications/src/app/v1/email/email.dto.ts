import { IsOptional, MaxLength, IsEmail, IsString } from 'class-validator';

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';
// import { Type } from 'class-transformer';

@InputType()
export class SendEmailInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(36)
  to?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @MaxLength(36, {
    each: true,
  })
  cc?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @MaxLength(36, {
    each: true,
  })
  bcc?: string[];

  @Field()
  @MaxLength(100)
  template: string;

  @Field()
  @MaxLength(300)
  subject: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(5000)
  body?: string;

  @Field(() => [Context], { nullable: true })
  @IsOptional()
  context?: Context[];
}
@InputType()
class Context {
  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  value: string;
}
