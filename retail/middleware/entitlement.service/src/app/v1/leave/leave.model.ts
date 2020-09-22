import { Field, ID, ObjectType } from "@nestjs/graphql";
import {PaginationModel} from '@common/models';

@ObjectType()
export class Leave {
  @Field(() => ID,{ nullable: true })
  id: string;

  @Field({ nullable: true })
  user_id?: string;

  @Field({ nullable: true })
  leave_date?: string;

  @Field({ nullable: true })
  leave_duration?: string;

  @Field({ nullable: true })
  leave_type?: string;

  @Field({ nullable: true })
  leave_type_id?: string;

  @Field({ nullable: true })
  remarks?: string;

  @Field({ nullable: true })
  is_repetitive?: number;

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
export class LeaveWithPagination {
  @Field({ nullable: true })
  pagination?: PaginationModel;

  @Field(type => [Leave], { nullable: true })
  data?: Leave[];
}
