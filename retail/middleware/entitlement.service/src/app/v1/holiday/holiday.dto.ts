import { Field, InputType } from "@nestjs/graphql";
import {
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MaxLength
} from "class-validator";

import {NUMBERS, STATUS} from "@common/constants";

@InputType()
export class HolidayInput {
  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, {message: 'holiday_date must be a valid date format'})
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
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.keys(STATUS))
  status: string;
}

@InputType()
export class HolidayCreateInput extends HolidayInput{
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
  holiday_date: string;
}
