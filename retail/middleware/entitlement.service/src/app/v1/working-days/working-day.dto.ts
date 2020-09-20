import { Field, InputType } from "@nestjs/graphql";
import {IsNumber, IsOptional, IsString, MaxLength} from "class-validator";

import { NUMBERS } from "@common/constants";

@InputType()
export class WorkingDayInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  week_day?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  start_time?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  end_time?: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  full_day?: number;

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

@InputType()
export class WorkingDayCreateInput extends WorkingDayInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  week_day: string;
}
