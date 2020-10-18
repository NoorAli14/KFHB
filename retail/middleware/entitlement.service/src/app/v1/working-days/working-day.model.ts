import { Field, ID, ObjectType } from "@nestjs/graphql";
import {PaginationModel} from '@common/models';
import {Type} from 'class-transformer';
import {IsIn, IsNumber, IsOptional, IsString, IsUUID, Length, Matches, MaxLength, ValidateIf} from "class-validator";
import {NUMBERS, STATUS, WEEK_DAYS} from "@common/constants";

@ObjectType()
export class WorkingDay {
  @Field(() => ID )
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  @IsIn(Object.keys(WEEK_DAYS))
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  week_day: string;

  @Field({ nullable: true })
  @IsString()
  @ValidateIf(o => o.full_day==0)
  @Length(4,4)
  @Matches(/^[0-9]*$/)
  @IsOptional()
  start_time_local: string;

  @Field({ nullable: true })
  @IsString()
  @ValidateIf(o => o.full_day==0)
  @Length(4,4)
  @Matches(/^[0-9]*$/)
  @IsOptional()
  end_time_local: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  remarks: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsIn([0, 1])
  @IsOptional()
  full_day: number;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  tenant_id: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
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
export class WorkingDayWithPagination {
  @Field({ nullable: true })
  pagination: PaginationModel;

  @Field(() => [WorkingDay], { nullable: true })
  data: WorkingDay[];
}
