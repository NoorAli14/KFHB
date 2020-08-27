import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field(() => ID)
  id?: string;
}