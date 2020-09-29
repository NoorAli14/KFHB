import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Permission } from '@app/v1/permissions/permission.model';
import { PaginationModel } from '@common/models';

@ObjectType()
export class Module {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  parent_id?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;

  @Field(type => [Module], { nullable: true })
  sub_modules?: Module[];

  @Field(type => [Permission], { nullable: true })
  permissions?: Permission[];
}

@ObjectType()
export class ModuleWithPagination {
  @Field({ nullable: true })
  pagination?: PaginationModel;

  @Field(type => [Module], { nullable: true })
  data?: Module[];
}
