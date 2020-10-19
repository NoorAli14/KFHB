// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@ObjectType()
export class EmailGQL {
  @Field({ nullable: true })
  @IsOptional()
  to: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @MaxLength(36, {
    each: true,
  })
  cc: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @MaxLength(36, {
    each: true,
  })
  bcc: string[];

  @Field()
  template: string;

  @Field()
  subject: string;

  @Field({ nullable: true })
  @IsOptional()
  body: string;

  @Field(() => [Contexts], { nullable: true })
  @IsOptional()
  context: Contexts[];
}

@ObjectType()
class Contexts {
  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  value: string;
}
