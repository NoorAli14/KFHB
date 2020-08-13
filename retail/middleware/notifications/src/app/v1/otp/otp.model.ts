import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Otp {
  @Field()
  id: string;

  @Field()
  user_id?: string;

  @Field()
  otp?: string;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
