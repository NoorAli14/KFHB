import { Field, ObjectType } from '@nestjs/graphql';
import { AmlResponse } from '../aml-response/aml-response-model';

@ObjectType()
export class AmlRequest {
  @Field()
  id: string;

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

  @Field(() => [AmlResponse], { nullable: true })
  responses?: AmlResponse[];

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
