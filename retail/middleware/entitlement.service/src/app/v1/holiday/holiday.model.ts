import { Field, ID, ObjectType } from "@nestjs/graphql";
import {PaginationModel} from '@common/models';
import {Type} from 'class-transformer';

@ObjectType()
export class Holiday {
  @Field(() => ID,{ nullable: true })
  id: string;

  @Field({ nullable: true })
  @Type(() => Date)
  holiday_date: Date;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  remarks: string;

  @Field({ nullable: true })
  tenant_id: string;

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  created_on: string;

  @Field({ nullable: true })
  created_by: string;

  @Field({ nullable: true })
  updated_on: string;

  @Field({ nullable: true })
  updated_by: string;

  @Field({ nullable: true })
  deleted_on: string;

  @Field({ nullable: true })
  deleted_by: string;
}

@ObjectType()
export class HolidayWithPagination {
  @Field({ nullable: true })
  pagination: PaginationModel;

  @Field(() => [Holiday], { nullable: true })
  data: Holiday[];
}
