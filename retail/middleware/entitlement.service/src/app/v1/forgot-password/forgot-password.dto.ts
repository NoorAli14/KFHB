import { Field, InputType } from '@nestjs/graphql';
import {IsEmail, IsString, MaxLength} from 'class-validator';
import {NUMBERS} from "@common/constants";

@InputType()
export class ForgotPasswordInput {
  @Field()
  @IsString()
  @IsEmail()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  email: string;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password_reset_token: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password: string;
}
