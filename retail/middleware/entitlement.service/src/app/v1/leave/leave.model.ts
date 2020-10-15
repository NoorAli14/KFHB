import { Field, ID, ObjectType } from "@nestjs/graphql";
import {PaginationModel} from '@common/models';
import {Type} from 'class-transformer';
import {IsOptional, IsString, IsUUID} from "class-validator";

@ObjectType()
export class Leave {
  @Field(() => ID,{ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  user_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  leave_type_id: string;

  @Field({ nullable: true })
  @Type(() => Date)
  @IsOptional()
  start_date: Date;

  @Field({ nullable: true })
  @Type(() => Date)
  @IsOptional()
  end_date: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  remarks: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  status: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  tenant_id: string;

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
export class LeaveWithPagination {
  @Field({ nullable: true })
  pagination: PaginationModel;

  @Field(() => [Leave], { nullable: true })
  data: Leave[];
}
