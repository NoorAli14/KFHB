import {Field, InputType} from "@nestjs/graphql";
import {IsIn, IsISO8601, IsOptional, IsString, MaxLength} from "class-validator";
import {NUMBERS, STATUS} from "@common/constants";

@InputType()
export class CreatedOnParams {
  @Field()
  @IsString()
  @IsISO8601({strict: true})
  start: string;

  @Field()
  @IsString()
  @IsISO8601({strict: true})
  end: string;
}

@InputType()
export class HolidaysFilterParams {
  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
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

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.keys(STATUS))
  status: string;

  @Field(() => CreatedOnParams, {nullable:true})
  @IsOptional()
  created_on: CreatedOnParams;
}