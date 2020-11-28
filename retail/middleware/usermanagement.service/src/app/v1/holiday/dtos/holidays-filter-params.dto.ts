import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsISO8601, IsOptional, IsString } from 'class-validator';
import { STATUS } from '@common/constants';
import { CreatedOnParams } from '@common/dtos';

@InputType()
export class HolidaysFilterParams {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsISO8601({ strict: true })
  holiday_date: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(STATUS))
  status: string;

  @Field(() => CreatedOnParams, { nullable: true })
  @IsOptional()
  created_on: CreatedOnParams;
}
