import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Field, ID, ObjectType } from "@nestjs/graphql";

import {Role } from "@app/v1/roles/role.model";
import { NUMBERS } from "@common/constants";

@ObjectType()
export class User {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  id: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  username?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  email?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  contact_no?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  first_name?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  middle_name?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  last_name?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  gender?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  date_of_birth?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  nationality_id?: number;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  created_on?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  created_by?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  updated_on?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  updated_by?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  deleted_on?: string;

  @Field({ nullable: true })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  deleted_by?: string;

  @Field(type => [Role], { nullable: true })
  roles?: Role[];
}
