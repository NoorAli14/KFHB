import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class UserInput {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  contact_no?: string;

  @Field({ nullable: true })
  password_digest?: string;

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
  token?: string;

  @Field({ nullable: true })
  token_expiry?: Date;

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

  @Field(type => [String], { nullable: true })
  role_ids?: string[];
}
