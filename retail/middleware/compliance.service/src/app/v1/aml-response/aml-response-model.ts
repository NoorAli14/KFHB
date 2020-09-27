import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AmlResponse {
  @Field()
  id: string;

  @Field()
  status: string;

  @Field()
  response_on: Date;

  @Field()
  response_text: string;

  @Field()
  created_on: Date;

  @Field()
  created_by: string;

  @Field()
  updated_on: Date;

  @Field()
  updated_by: string;

  @Field()
  deleted_on: Date;

  @Field()
  deleted_by: string;

  @Field()
  request_id: string;
}
