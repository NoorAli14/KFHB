import {IsNotEmpty, IsString} from "class-validator";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsString()
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
}