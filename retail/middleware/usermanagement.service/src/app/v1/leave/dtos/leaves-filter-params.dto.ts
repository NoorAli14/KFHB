import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsISO8601, IsOptional, IsString, IsUUID } from 'class-validator';
import { STATUS } from '@common/constants';
import { CreatedOnParams } from '@common/dtos';

@InputType()
export class LeavesFilterParams {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  user_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  leave_type_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsISO8601({ strict: true })
  start_date: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsISO8601({ strict: true })
  end_date: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(STATUS))
  status: string;

  @Field(() => CreatedOnParams, { nullable: true })
  @IsOptional()
  created_on: CreatedOnParams;
}
