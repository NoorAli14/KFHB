import {
  IsOptional,
  MaxLength,
  IsString,
  IsIn, IsISO8601, IsBoolean,
} from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';
import { GENDER, NUMBERS, STATUS } from "@rubix/common";
const DEVICES: string[] = ['ios', 'andriod'];
@InputType('CreateCustomerInput')
export class NewCustomerInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  first_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  last_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  contact_no: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  device_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(DEVICES)
  @MaxLength(10)
  platform: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  fcm_token_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  last_step: string;
}

@InputType()
export class UpdateCustomerInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  first_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  middle_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  last_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(GENDER))
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  gender: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsISO8601({strict: true})
  date_of_birth: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  last_step: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(STATUS))
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  contact_no: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  nationality: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  nationality_code: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  is_aml_verified: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  is_email_verified: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  is_evaluation_verified: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  is_contact_no_verified: boolean;
}