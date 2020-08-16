// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailGQL {
  @Field()
  to: string;
  
  @Field()
  template: string;

  @Field()
  subject: string;

  @Field({ nullable: true })
  body: string;

  @Field(type => [Contexts], { nullable: true })
  context: Contexts[];
}

@ObjectType()
class Contexts {
  @Field({ nullable: true })
  key: string;
  
  @Field({ nullable: true })
  value: string;
}
