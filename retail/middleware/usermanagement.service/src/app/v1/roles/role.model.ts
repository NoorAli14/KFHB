import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Module } from '@app/v1/modules/module.model';
import { ENT_PaginationModel } from '@common/models';
import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { NUMBERS, STATUS } from '@common/constants';
import { Type } from 'class-transformer';

@ObjectType()
export class Role {
  @Field(() => ID)
  @IsString()
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
  @IsUUID()
  tenant_id?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(STATUS))
  status?: string;

  @Field()
  @IsString()
  created_on?: string;

  @Field()
  @IsString()
  created_by?: string;

  @Field()
  @IsString()
  updated_on?: string;

  @Field()
  @IsString()
  updated_by?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  deleted_on?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  deleted_by?: string;

  @Field(() => [Module], { nullable: true })
  @IsOptional()
  @Type(() => Module)
  modules?: Module[];
}

@ObjectType()
export class RolesWithPagination {
  @Field({ nullable: true })
  @Type(() => ENT_PaginationModel)
  pagination: ENT_PaginationModel;

  @Field(() => [Role], { nullable: true })
  @Type(() => Role)
  data: Role[];
}
