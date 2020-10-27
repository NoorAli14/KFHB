import { Field, ID, ObjectType } from "@nestjs/graphql";
import {ENT_PaginationModel} from '@common/models';
import {Type} from 'class-transformer';
import {IsIn, IsOptional, IsString, IsUUID, MaxLength} from "class-validator";
import {NUMBERS, STATUS} from "@common/constants";

@ObjectType()
export class LeaveType {
  @Field(() => ID)
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.keys(STATUS))
  status: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  tenant_id: string;

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
export class LeaveTypeWithPagination {
  @Field({ nullable: true })
  pagination: ENT_PaginationModel;

  @Field(() => [LeaveType], { nullable: true })
  data: LeaveType[];
}
