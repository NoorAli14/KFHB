import { Field, InputType } from "@nestjs/graphql";
import {IsIn, IsNumber, IsOptional, IsString, Length, Matches, MaxLength, ValidateIf} from "class-validator";

import {NUMBERS, STATUS, WEEK_DAYS} from "@common/constants";

@InputType()
export class WorkingDayInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(WEEK_DAYS))
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  week_day: string;

  @Field({ nullable: true })
  @IsString()
  @ValidateIf(o => o.full_day==0)
  @Length(4)
  @Matches(/^[0-9]*$/)
  start_time_local: string;

  @Field({ nullable: true })
  @IsString()
  @ValidateIf(o => o.full_day==0)
  @Length(4)
  @Matches(/^[0-9]*$/)
  end_time_local: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsIn([0, 1])
  @IsOptional()
  full_day: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  remarks: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(STATUS))
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status: string;
}

@InputType()
export class WorkingDayCreateInput extends WorkingDayInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.keys(WEEK_DAYS))
  week_day: string;

  @Field()
  @IsNumber()
  @IsIn([0, 1])
  full_day: number;
}
