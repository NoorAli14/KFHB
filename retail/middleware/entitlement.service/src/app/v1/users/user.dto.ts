import { Field, InputType } from "@nestjs/graphql";
import {IsBoolean, IsEmail, IsIn, IsISO8601, IsOptional, IsString, MaxLength} from "class-validator";

import {GENDER, NUMBERS} from "@common/constants";
import {IdsInput} from "@common/inputs/ids.input";

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
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  is_owner?: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  date_of_birth?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.NATIONALITY_ID_LENGTH)
  nationality_id?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  invitation_token?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  invitation_token_expiry?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password_reset_token?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password_reset_token_expiry?: string;

  @Field(() => [IdsInput], { nullable: true })
  roles?: IdsInput[];
}

@InputType()
export class CreateUserInput extends UpdateUserInput{
  @Field()
  @IsString()
  @IsEmail()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  email: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  current_password: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  new_password: string;
}

@InputType()
export class CheckAvailabilityInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsISO8601({strict: true})
  call_time: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.keys(GENDER))
  gender?: string;
}
