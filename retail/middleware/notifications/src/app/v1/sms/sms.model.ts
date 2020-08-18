// Graphql Model
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SMSGQL {
  @Field()
  to: string;
  
  @Field()
  body: string;
}