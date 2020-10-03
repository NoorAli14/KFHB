import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewAlmRequestInput {
  @Field()
  user_id: string;

  @Field()
  tenant_id: string;

  @Field()
  request_reference: string;

  @Field()
  aml_text: string;

  @Field()
  remarks: string;

  @Field()
  status: string;
}

@InputType()
export class AlmRequestAlertInput {
  @Field()
  reference_no: string;

  @Field()
  response_code: string;

  @Field()
  status: string;
}