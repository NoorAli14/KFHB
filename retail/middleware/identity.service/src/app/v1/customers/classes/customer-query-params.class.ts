import {Field} from "@nestjs/graphql";
import {IsEmail, IsIn, IsISO8601, IsOptional, IsString, MaxLength} from "class-validator";
import {NUMBERS, STATUS} from "@rubix/common";
import {QueryParams} from "@common/classes";

export class CustomerQueryParams extends QueryParams {
  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  national_id_no: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  gender: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  nationality: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  first_name: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  last_name: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.keys(STATUS))
  status: string;

  @Field()
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  contact_no: string;

  @Field()
  @IsString()
  @IsEmail()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  email: string;

  @Field()
  @IsString()
  @IsOptional()
  @IsISO8601({strict: true})
  created_on_start: string;

  @Field()
  @IsString()
  @IsOptional()
  @IsISO8601({strict: true})
  created_on_end: string;
}
