import { Field, ID, ObjectType } from "@nestjs/graphql";
import {PaginationModel} from '@common/models';

@ObjectType()
export class Holiday {
  @Field(() => ID,{ nullable: true })
  id: string;

  @Field({ nullable: true })
  calendar_day?: string;

  @Field({ nullable: true })
  holiday_type?: string;

  @Field({ nullable: true })
  holiday_details?: string;

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
export class HolidayWithPagination {
  @Field({ nullable: true })
  pagination?: PaginationModel;

  @Field(type => [Holiday], { nullable: true })
  data?: Holiday[];
}
