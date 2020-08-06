// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailGQL {
  @Field({ nullable: true })
  to: string;
  
  @Field({ nullable: true })
  template: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  body: string;

  // @Field({ nullable: true })
  // context: object;
}
