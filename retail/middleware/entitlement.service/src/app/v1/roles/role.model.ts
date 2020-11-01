import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Module } from '@app/v1/modules/module.model';
import { ENT_PaginationModel } from '@common/models';
import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { NUMBERS, STATUS } from '@common/constants';

@ObjectType()
export class Role {
  @Field(() => ID)
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  id?: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  description?: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  tenant_id?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.keys(STATUS))
  status?: string;

  @Field()
  @IsString()
  created_on?: string;

  @Field()
  @IsString()
  @IsUUID()
  created_by?: string;

  @Field()
  @IsString()
  updated_on?: string;

  @Field()
  @IsString()
  @IsUUID()
  updated_by?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  deleted_on?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  deleted_by?: string;

  @Field(() => [Module], { nullable: true })
  @IsOptional()
  modules?: Module[];
}

@ObjectType()
export class RolesWithPagination {
  @Field({ nullable: true })
  pagination: ENT_PaginationModel;

  @Field(() => [Role], { nullable: true })
  data: Role[];
}
