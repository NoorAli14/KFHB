import { Field, ObjectType, ID } from '@nestjs/graphql';
import { IDT_PaginationModel } from "@common/models";

@ObjectType()
export class Customer {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  first_name: string;

  @Field({ nullable: true })
  middle_name: string;

  @Field({ nullable: true })
  last_name: string;

  @Field({ nullable: true })
  tenant_id: string;

  @Field({ nullable: true })
  session_id: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  contact_no: string;

  @Field({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  date_of_birth: string;

  @Field({ nullable: true })
  national_id_no: string;

  @Field({ nullable: true })
  national_id_expiry: string;

  @Field({ nullable: true })
  nationality: string;

  @Field({ nullable: true })
  nationality_code: string;

  @Field({ nullable: true })
  device_id: string;

  @Field({ nullable: true })
  platform: string;

  @Field({ nullable: true })
  last_step: string;

  @Field({ nullable: true })
  is_aml_verified: boolean;

  @Field({ nullable: true })
  is_email_verified: boolean;

  @Field({ nullable: true })
  is_contact_no_verified: boolean;

  @Field({ nullable: true })
  is_evaluation_verified: boolean;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  fcm_token_id?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;

  @Field({ nullable: true })
  updated_on?: string;

  @Field({ nullable: true })
  updated_by?: string;

  @Field({ nullable: true })
  deleted_on?: string;

  @Field({ nullable: true })
  deleted_by?: string;

  @Field({ nullable: true })
  entity_id?: string;

  @Field({ nullable: true })
  entity_member_id?: string;
}

@ObjectType()
export class CustomerWithPagination {
  @Field({ nullable: true })
  pagination: IDT_PaginationModel;

  @Field(() => [Customer], { nullable: true })
  data: Customer[];
}
