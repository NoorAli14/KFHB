import { Field, ID, ObjectType } from "@nestjs/graphql";

import { Role } from "@app/v1/roles/role.model";
import {Module} from "@app/v1/modules/module.model";
import {Leave} from "@app/v1/leave/leave.model";
import {PaginationModel} from "@common/models";

@ObjectType()
export class User {
  @Field(() => ID,{ nullable: true })
  id: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  contact_no?: string;

  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  middle_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  date_of_birth?: string;

  @Field({ nullable: true })
  nationality_id?: string;

  @Field({ nullable: true })
  status?: string;

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

  @Field(type => [Role], { nullable: true })
  roles?: Role[];

  @Field(type => [Module], { nullable: true })
  modules?: Module[];

  @Field({ nullable: true })
  invitation_token?: string;

  @Field({ nullable: true })
  invitation_token_expiry?: Date;

  @Field({ nullable: true })
  password_reset_token?: string;

  @Field({ nullable: true })
  password_reset_token_expiry?: Date;

  @Field(type => [Leave], { nullable: true })
  leaves?: Leave[];
}

@ObjectType()
export class UserWithPagination {
  @Field({ nullable: true })
  pagination?: PaginationModel;

  @Field(type => [User], { nullable: true })
  data?: User[];
}
