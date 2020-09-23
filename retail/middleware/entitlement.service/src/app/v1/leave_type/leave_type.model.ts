import { Field, ID, ObjectType } from "@nestjs/graphql";
import {PaginationModel} from '@common/models';
import {Type} from 'class-transformer';

@ObjectType()
export class LeaveType {
  @Field(() => ID,{ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  tenant_id: string;

  @Field({ nullable: true })
  @Type(() => Date)
  created_on: Date;

  @Field({ nullable: true })
  created_by: string;

  @Field({ nullable: true })
  @Type(() => Date)
  updated_on: Date;

  @Field({ nullable: true })
  updated_by: string;

  @Field({ nullable: true })
  @Type(() => Date)
  deleted_on: Date;

  @Field({ nullable: true })
  deleted_by: string;
}

@ObjectType()
export class LeaveTypeWithPagination {
  @Field({ nullable: true })
  pagination: PaginationModel;

  @Field(() => [LeaveType], { nullable: true })
  data: LeaveType[];
}
