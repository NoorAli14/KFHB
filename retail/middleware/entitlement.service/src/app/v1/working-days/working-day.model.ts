import { Field, ID, ObjectType } from "@nestjs/graphql";
import {PaginationModel} from '@common/models';
import {Type} from 'class-transformer';
import {IsNumber, IsOptional, IsString, IsUUID} from "class-validator";

@ObjectType()
export class WorkingDay {
  @Field(() => ID,{ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  week_day: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  start_time_local: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  end_time_local: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  remarks: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  full_day: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  tenant_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  status: string;

  @Field({ nullable: true })
  @Type(() => Date)
  @IsOptional()
  created_on: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  created_by: string;

  @Field({ nullable: true })
  @Type(() => Date)
  @IsOptional()
  updated_on: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
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
