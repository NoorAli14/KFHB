import {Field, InputType} from "@nestjs/graphql";
import {IsIn, IsOptional, IsString, MaxLength} from "class-validator";
import {NUMBERS, STATUS, GENDER} from "@rubix/common";
import {CreatedOnParams} from "@common/dtos";

@InputType()
export class CustomersFilterParams {
  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  national_id_no: string;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @IsIn(Object.values(GENDER))
  gender: string;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  nationality: string;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  first_name: string;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  last_name: string;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(STATUS))
  status: string;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  contact_no: string;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  email: string;

  @Field(() => CreatedOnParams, {nullable:true})
  @IsOptional()
  created_on: CreatedOnParams;
}