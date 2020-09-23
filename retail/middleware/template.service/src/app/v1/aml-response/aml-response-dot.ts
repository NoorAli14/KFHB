import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewAlmResponseInput {
  @Field()
  response_status: string;

  @Field()
  response_type: string;

  @Field()
  created_by: string;

  @Field()
  updated_by: string;

  @Field()
  request_id: string;
}
