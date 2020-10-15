import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Permission } from '@app/v1/permissions/permission.model';
import { PaginationModel } from '@common/models';
import {IsOptional, IsString, IsUUID} from "class-validator";

@ObjectType()
export class Module {
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
  slug?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  parent_id?: string;

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

  @Field(() => [Module], { nullable: true })
  @IsOptional()
  sub_modules?: Module[];

  @Field(() => [Permission], { nullable: true })
  @IsOptional()
  permissions?: Permission[];
}

@ObjectType()
export class ModuleWithPagination {
  @Field({ nullable: true })
  pagination?: PaginationModel;

  @Field(() => [Module], { nullable: true })
  data?: Module[];
}
