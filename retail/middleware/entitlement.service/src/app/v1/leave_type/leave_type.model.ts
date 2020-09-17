import { Field, ID, ObjectType } from "@nestjs/graphql";
import {PaginationModel} from '@common/models';

@ObjectType()
export class LeaveType {
  @Field(() => ID,{ nullable: true })
  id: string;

  @Field({ nullable: true })
  leave_type?: string;

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
}

@ObjectType()
export class LeaveTypeWithPagination {
  @Field({ nullable: true })
  pagination?: PaginationModel;

  @Field(type => [LeaveType], { nullable: true })
  data?: LeaveType[];
}
