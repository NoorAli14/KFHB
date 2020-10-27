import {Field, InputType} from "@nestjs/graphql";
import {IsIn, IsOptional, IsString, MaxLength} from "class-validator";
import {NUMBERS, STATUS} from "@common/constants";
import {CreatedOnParams} from "@common/classes";

@InputType()
export class RolesFilterParams {
  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  name: string;

  @Field({nullable:true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  description: string;

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