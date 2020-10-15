import { Field, ID, ObjectType } from "@nestjs/graphql";
import {PaginationModel} from '@common/models';
import {Type} from 'class-transformer';
import {IsIn, IsOptional, IsString, IsUUID, MaxLength} from "class-validator";
import {NUMBERS, STATUS} from "@common/constants";

@ObjectType()
export class Holiday {
  @Field(() => ID)
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  id: string;

  @Field()
  @Type(() => Date)
  holiday_date: Date;

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
  @IsUUID()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  tenant_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.keys(STATUS))
  status: string;

  @Field()
  @Type(() => Date)
  created_on: Date;

  @Field()
  @IsString()
  @IsUUID()
  created_by: string;

  @Field()
  @Type(() => Date)
  updated_on: Date;

  @Field()
  @IsString()
  @IsUUID()
  updated_by: string;

  @Field({ nullable: true })
  @Type(() => Date)
  @IsOptional()
  deleted_on: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  deleted_by: string;
}

@ObjectType()
export class HolidayWithPagination {
  @Field({ nullable: true })
  pagination: PaginationModel;

  @Field(() => [Holiday], { nullable: true })
  data: Holiday[];
}
