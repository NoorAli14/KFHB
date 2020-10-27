import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Role } from '@app/v1/roles/role.model';
import { Module } from '@app/v1/modules/module.model';
import { Leave } from '@app/v1/leave/leave.model';
import { ENT_PaginationModel } from '@common/models';
import { Type } from 'class-transformer';
import {IsBoolean, IsEmail, IsIn, IsOptional, IsString, IsUUID, MaxLength} from "class-validator";
import {NUMBERS, STATUS} from "@common/constants";

@ObjectType()
export class User {
  @Field(() => ID)
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  contact_no: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  first_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  middle_name: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  last_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password_digest: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  gender: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  is_owner: boolean;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  tenant_id: string;

  @Field({ nullable: true })
  @Type(() => Date)
  @IsOptional()
  date_of_birth: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  nationality_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.values(STATUS))
  status: string;

  @Field()
  @IsString()
  created_on: string;

  @Field()
  @IsString()
  @IsUUID()
  created_by: string;

  @Field()
  @IsString()
  updated_on: string;

  @Field()
  @IsString()
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
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  invitation_token: string;

  @Field({ nullable: true })
  @IsOptional()
  invitation_token_expiry: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password_reset_token: string;

  @Field({ nullable: true })
  @IsOptional()
  password_reset_token_expiry: Date;

  @Field(() => [Leave], { nullable: true })
  @IsOptional()
  leaves: Leave[];
}

@ObjectType()
export class UsersWithPagination {
  @Field({ nullable: true })
  pagination: ENT_PaginationModel;

  @Field(() => [User], { nullable: true })
  data: User[];
}
