import { Field, InputType } from "@nestjs/graphql";
import {IsOptional, IsString, IsUUID, Matches, MaxLength} from "class-validator";

import { NUMBERS } from "@common/constants";

@InputType()
export class LeaveInput {
  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  @IsUUID()
  user_id: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  @IsUUID()
  leave_type_id: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, {message: 'start_date must be a valid date format'})
  start_date: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, {message: 'end_date must be a valid date format'})
  end_date: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  remarks: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status: string;
}

@InputType()
export class LeaveCreateInput extends LeaveInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  user_id: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  leave_type_id: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, {message: 'start_date must be a valid date format'})
  start_date: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, {message: 'end_date must be a valid date format'})
  end_date: string;
}
