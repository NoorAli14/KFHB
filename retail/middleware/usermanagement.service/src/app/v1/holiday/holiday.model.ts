import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ENT_PaginationModel } from '@common/models';
import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { NUMBERS, STATUS } from '@common/constants';

@ObjectType()
export class Holiday {
  @Field(() => ID)
  @IsString()
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
export class HolidaysWithPagination {
  @Field({ nullable: true })
  @Type(() => ENT_PaginationModel)
  pagination: ENT_PaginationModel;

  @Field(() => [Holiday], { nullable: true })
  @Type(() => Holiday)
  data: Holiday[];
}
