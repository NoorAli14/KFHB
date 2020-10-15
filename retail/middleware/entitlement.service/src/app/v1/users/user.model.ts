import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Role } from '@app/v1/roles/role.model';
import { Module } from '@app/v1/modules/module.model';
import { Leave } from '@app/v1/leave/leave.model';
import { PaginationModel } from '@common/models';
import { Type } from 'class-transformer';
import {IsEmail, IsOptional, IsString, IsUUID} from "class-validator";

@ObjectType()
export class User {
  @Field(() => ID, { nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  contact_no: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  first_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  middle_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  last_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  password_digest: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  gender: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  is_owner: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  tenant_id: string;

  @Field({ nullable: true })
  @Type(() => Date)
  @IsOptional()
  date_of_birth: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  nationality_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  status: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  created_on: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  created_by: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  updated_on: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  updated_by: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  deleted_on: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  deleted_by: string;

  @Field(() => [Role], { nullable: true })
  @IsOptional()
  roles: Role[];

  @Field(() => [Module], { nullable: true })
  @IsOptional()
  modules: Module[];

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  invitation_token: string;

  @Field({ nullable: true })
  @IsOptional()
  invitation_token_expiry: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  password_reset_token: string;

  @Field({ nullable: true })
  @IsOptional()
  password_reset_token_expiry: Date;

  @Field(() => [Leave], { nullable: true })
  @IsOptional()
  leaves: Leave[];
}

@ObjectType()
export class UserWithPagination {
  @Field({ nullable: true })
  pagination: PaginationModel;

  @Field(() => [User], { nullable: true })
  data: User[];
}
