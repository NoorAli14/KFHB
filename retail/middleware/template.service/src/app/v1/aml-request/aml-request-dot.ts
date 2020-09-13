import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewAlmRequestInput {
  @Field()
  customer_id: string;

  @Field()
  aml_text: string;

  @Field()
  remarks: string;

  @Field()
  status: string;
}
