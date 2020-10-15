import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PaginationModel } from '@common/models';
import {IsOptional, IsString, IsUUID} from "class-validator";

@ObjectType()
export class Permission {
  @Field(() => ID, { nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  id?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  record_type?: string;

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
  @IsUUID()
  module_permission_id?: string;
}

@ObjectType()
export class PermissionWithPagination {
  @Field({ nullable: true })
  pagination?: PaginationModel;

  @Field(type => [Permission], { nullable: true })
  data?: Permission[];
}
