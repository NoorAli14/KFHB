import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import {Type} from "class-transformer";

import { NUMBERS, SYSTEM_AUDIT_CODES } from '@common/constants';
import { ENT_PaginationModel } from '@common/models';
import {User} from "@app/v1/users/user.model";

@ObjectType()
export class SystemAuditLog {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  @IsUUID()
  tenant_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsUUID()
  @IsOptional()
  user_id: string;

  @Field()
  @IsString()
  @IsIn(Object.values(SYSTEM_AUDIT_CODES))
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  audit_code: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  audit_text: string;

  @Field()
  @IsString()
  created_on: string;

  @Field()
  @IsString()
  created_by: string;

  @Field(() => User, { nullable: true })
  @IsOptional()
  @Type(() => User)
  user: User;
}

@ObjectType()
export class SALWithPagination {
  @Field({ nullable: true })
  pagination: ENT_PaginationModel;

  @Field(() => [SystemAuditLog], { nullable: true })
  data: SystemAuditLog[];
}
