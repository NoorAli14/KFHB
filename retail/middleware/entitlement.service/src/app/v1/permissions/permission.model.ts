import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PaginationModel } from '@common/models';

@ObjectType()
export class Permission {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  record_type?: string;

  @Field({ nullable: true })
  created_on?: string;

  @Field({ nullable: true })
  created_by?: string;

  @Field({ nullable: true })
  module_permission_id?: string;
}

@ObjectType()
export class PermissionWithPagination {
  @Field({ nullable: true })
  pagination?: PaginationModel;

  @Field(type => [Permission], { nullable: true })
  data?: Permission[];
}
