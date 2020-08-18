import { Field, InputType } from "@nestjs/graphql";
import {IsEmail, IsNumber, IsOptional, IsString, MaxLength} from "class-validator";

import { NUMBERS } from "@common/constants";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  username?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  contact_no?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  first_name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  middle_name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  last_name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  gender?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  date_of_birth?: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  nationality_id?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status?: string;

  @Field(type => [String], { nullable: true })
  role_ids?: string[];
}

@InputType()
export class CreateUserInput extends UpdateUserInput{
  @Field()
  @IsString()
  @IsEmail()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  email: string;
}
