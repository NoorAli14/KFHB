import { Field, ID, ObjectType } from "@nestjs/graphql";
import {PaginationModel} from '@common/models';
import {Type} from 'class-transformer';

@ObjectType()
export class WorkingDay {
  @Field(() => ID,{ nullable: true })
  id: string;

  @Field({ nullable: true })
  week_day: string;

  @Field({ nullable: true })
  start_time_local: string;

  @Field({ nullable: true })
  end_time_local: string;

  @Field({ nullable: true })
  remarks: string;

  @Field({ nullable: true })
  full_day: number;

  @Field({ nullable: true })
  tenant_id: string;

  @Field({ nullable: true })
  status: string;

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
export class WorkingDayWithPagination {
  @Field({ nullable: true })
  pagination: PaginationModel;

  @Field(() => [WorkingDay], { nullable: true })
  data: WorkingDay[];
}
