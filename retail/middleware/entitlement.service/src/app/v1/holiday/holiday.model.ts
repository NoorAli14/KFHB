import { Field, ID, ObjectType } from "@nestjs/graphql";
import {PaginationModel} from '@common/models';
import {Type} from 'class-transformer';
import {IsOptional, IsString, IsUUID} from "class-validator";

@ObjectType()
export class Holiday {
  @Field(() => ID,{ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @Type(() => Date)
  @IsOptional()
  holiday_date: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  remarks: string;

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
export class HolidayWithPagination {
  @Field({ nullable: true })
  pagination: PaginationModel;

  @Field(() => [Holiday], { nullable: true })
  data: Holiday[];
}
