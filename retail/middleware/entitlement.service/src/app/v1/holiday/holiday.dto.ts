import { Field, InputType } from "@nestjs/graphql";
import {
  IsIn, IsISO8601,
  IsOptional,
  IsString,
  MaxLength
} from "class-validator";

import {NUMBERS, STATUS} from "@common/constants";

@InputType()
export class HolidayInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsISO8601({strict: true})
  holiday_date: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  description: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  remarks: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(STATUS))
  status: string;
}

@InputType()
export class HolidayCreateInput extends HolidayInput{
  @Field()
  @IsString()
  @IsISO8601({strict: true})
  holiday_date: string;
}
