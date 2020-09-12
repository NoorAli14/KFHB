import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AmlRequest {
  @Field()
  id: string;

  @Field()
  customer_id: string;

  @Field()
  aml_text: string;

  @Field()
  remarks: string;

  @Field()
  status: string;

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
}
