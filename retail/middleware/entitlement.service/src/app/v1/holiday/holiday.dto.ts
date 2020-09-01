import { Field, InputType } from "@nestjs/graphql";
import {IsNumber, IsOptional, IsString, MaxLength} from "class-validator";

import { NUMBERS } from "@common/constants";

@InputType()
export class HolidayInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  calendar_day: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  holiday_type?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  holiday_details?: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  is_repetitive?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  remarks?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status?: string;
}
