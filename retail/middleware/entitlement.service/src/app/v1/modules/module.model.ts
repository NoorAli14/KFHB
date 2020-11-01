import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Permission } from '@app/v1/permissions/permission.model';
import { ENT_PaginationModel } from '@common/models';
import {IsIn, IsOptional, IsString, IsUUID, MaxLength} from "class-validator";
import {NUMBERS, STATUS} from "@common/constants";

@ObjectType()
export class Module {
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
  slug?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  parent_id?: string;

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
  pagination?: ENT_PaginationModel;

  @Field(() => [Module], { nullable: true })
  data?: Module[];
}
