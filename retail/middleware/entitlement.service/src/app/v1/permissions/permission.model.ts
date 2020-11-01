import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ENT_PaginationModel } from '@common/models';
import {IsOptional, IsString, IsUUID, MaxLength} from "class-validator";
import {NUMBERS} from "@common/constants";

@ObjectType()
export class Permission {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  id?: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  record_type?: string;

  @Field()
  @IsString()
  created_on?: string;

  @Field()
  @IsString()
  created_by?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  module_permission_id?: string;
}

@ObjectType()
export class PermissionWithPagination {
  @Field({ nullable: true })
  pagination?: ENT_PaginationModel;

  @Field(() => [Permission], { nullable: true })
  data?: Permission[];
}
