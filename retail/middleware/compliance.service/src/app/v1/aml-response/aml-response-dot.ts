import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewAlmResponseInput {
  @Field()
  status: string;

  @Field()
  response_text: string;

  @Field()
  created_by: string;

  @Field()
  updated_by: string;

  @Field()
  request_id: string;
}
