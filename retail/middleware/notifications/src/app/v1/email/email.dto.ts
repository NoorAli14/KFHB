import {
  IsOptional,
  MaxLength,
} from 'class-validator';

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';
// import { Type } from 'class-transformer';

@InputType()
export class SendEmailInput {
  @Field()
  @MaxLength(30)
  to: string;

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

  @Field(type => [Context], { nullable: true })
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