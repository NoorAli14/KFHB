import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Module } from '@app/v1/modules/module.model';
import { PaginationModel } from '@common/models';

@ObjectType()
export class Role {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  tenant_id?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;

  @Field({ nullable: true })
  updated_on?: string;

  @Field({ nullable: true })
  updated_by?: string;

  @Field({ nullable: true })
  deleted_on?: string;

  @Field({ nullable: true })
  deleted_by?: string;

  @Field(() => [Module], { nullable: true })
  modules?: Module[];
}

@ObjectType()
export class RoleWithPagination {
  @Field({ nullable: true })
  pagination?: PaginationModel;

  @Field(() => [Role], { nullable: true })
  data?: Role[];
}
