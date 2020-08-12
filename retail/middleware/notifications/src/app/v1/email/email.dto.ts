import {
  IsString,
  IsInt,
  IsOptional,
  Length,
  MaxLength,
  // ValidateNested,
} from 'class-validator';

// Graphql Example DTO
import { Field, InputType } from '@nestjs/graphql';
// import { Type } from 'class-transformer';

@InputType()
export class SendEmailInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  to?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  template?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(300)
  subject?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(1000)
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