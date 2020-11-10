import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ENT_PaginationModel } from '@common/models';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { NUMBERS, STATUS, WEEK_DAYS } from '@common/constants';

@ObjectType()
export class WorkingDay {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  @IsIn(Object.keys(WEEK_DAYS))
  week_day: string;

  @Field({ nullable: true })
  @IsString()
  @ValidateIf(o => o.full_day == 0)
  @Length(4, 4)
  @Matches(/^[0-9]*$/)
  @IsOptional()
  start_time_local: string;

  @Field({ nullable: true })
  @IsString()
  @ValidateIf(o => o.full_day == 0)
  @Length(4, 4)
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
  @IsUUID()
  tenant_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(STATUS))
  status: string;

  @Field()
  @Type(() => Date)
  created_on: Date;

  @Field()
  @IsString()
  created_by: string;

  @Field()
  @Type(() => Date)
  updated_on: Date;

  @Field()
  @IsString()
  updated_by: string;

  @Field({ nullable: true })
  @Type(() => Date)
  @IsOptional()
  deleted_on: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  deleted_by: string;
}

@ObjectType()
export class WorkingDayWithPagination {
  @Field({ nullable: true })
  pagination: ENT_PaginationModel;

  @Field(() => [WorkingDay], { nullable: true })
  data: WorkingDay[];
}
