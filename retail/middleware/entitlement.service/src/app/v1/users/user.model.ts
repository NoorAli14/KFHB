import { Field, ID, ObjectType } from "@nestjs/graphql";

import { Role } from "@app/v1/roles/role.model";
import {Module} from "@app/v1/modules/module.model";

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
  nationality_id?: number;

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

  // @Field(type => [Module], { nullable: true })
  // modules?: Module[];
}
