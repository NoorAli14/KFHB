import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, IsIn, IsISO8601, IsOptional, IsString, MaxLength} from "class-validator";
import {NUMBERS, STATUS} from "@rubix/common";

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
export class CustomersFilterParams {
  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  national_id_no: string;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
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
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.keys(STATUS))
  status: string;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  contact_no: string;

  @Field({nullable:true})
  @IsString()
  @IsEmail()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  email: string;

  @Field(() => CreatedOnParams, {nullable:true})
  @IsOptional()
  created_on: CreatedOnParams;
}