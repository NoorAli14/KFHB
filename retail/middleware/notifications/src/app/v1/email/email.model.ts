// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@ObjectType()
export class EmailGQL {
  @Field()
  to: string;

  @Field(() => [String], { nullable: false })
  @MaxLength(36, {
    each: true,
  })
  cc?: string[];

  @Field()
  template: string;

  @Field()
  subject: string;

  @Field({ nullable: true })
  body: string;

  @Field(() => [Contexts], { nullable: true })
  context: Contexts[];
}

@ObjectType()
class Contexts {
  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  value: string;
}
