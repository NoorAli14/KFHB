import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Module } from '@app/v1/modules/module.model';
import { PaginationModel } from '@common/models';
import {IsOptional, IsString, IsUUID} from "class-validator";

@ObjectType()
export class Role {
  @Field(() => ID, { nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  id?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  tenant_id?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  status?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  created_on?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  created_by?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  updated_on?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
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
export class RoleWithPagination {
  @Field({ nullable: true })
  pagination?: PaginationModel;

  @Field(() => [Role], { nullable: true })
  data?: Role[];
}
