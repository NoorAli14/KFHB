import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Role } from '@app/v1/roles/role.model';
import { Module } from '@app/v1/modules/module.model';
import { Leave } from '@app/v1/leave/leave.model';
import { ENT_PaginationModel } from '@common/models';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { GENDER, NUMBERS, STATUS } from '@common/constants';

@ObjectType()
export class User {
  @Field(() => ID)
  @IsString()
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

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  first_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  middle_name: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  last_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  password_digest: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.values(GENDER))
  gender: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  is_owner: boolean;

  @Field()
  @IsString()
  @IsUUID()
  tenant_id: string;

  @Field({ nullable: true })
  @Type(() => Date)
  @IsOptional()
  date_of_birth: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.NATIONALITY_ID_LENGTH)
  nationality_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.values(STATUS))
  status: string;

  @Field({ nullable: true })
  @IsString()
  @IsUUID()
  @IsOptional()
  entity_id: string;

  @Field()
  @IsString()
  created_on: string;

  @Field()
  @IsString()
  created_by: string;

  @Field()
  @IsString()
  updated_on: string;

  @Field()
  @IsString()
  updated_by: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  deleted_on: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  deleted_by: string;

  @Field(() => [Role], { nullable: true })
  @IsOptional()
  @Type(() => Role)
  roles: Role[];

  @Field(() => [Module], { nullable: true })
  @IsOptional()
  @Type(() => Module)
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
  @Type(() => Leave)
  leaves: Leave[];
}

@ObjectType()
export class UsersWithPagination {
  @Field({ nullable: true })
  @Type(() => ENT_PaginationModel)
  pagination: ENT_PaginationModel;

  @Field(() => [User], { nullable: true })
  @Type(() => User)
  data: User[];
}

// user response for system audit log
@ObjectType()
export class UserForSAL {
  @Field(() => ID, {nullable: true})
  @IsString()
  @IsUUID()
  @IsOptional()
  id: string;

  @Field({nullable: true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsEmail()
  email: string;

  @Field({nullable: true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  contact_no: string;

  @Field({nullable: true})
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  first_name: string;

  @Field({nullable: true})
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  middle_name: string;

  @Field({nullable: true})
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  last_name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.values(GENDER))
  gender: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.values(STATUS))
  status: string;
}
