// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SMS {
  @Field()
  to: string;
  
  @Field()
  body: string;
}