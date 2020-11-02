import { Field, InputType } from '@nestjs/graphql';
import {
  IsIn,
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { NUMBERS, STATUS } from '@common/constants';

@InputType()
export class LeaveInput {
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
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  remarks: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(STATUS))
  status: string;
}

@InputType()
export class LeaveCreateInput extends LeaveInput {
  @Field()
  @IsString()
  @IsUUID()
  user_id: string;

  @Field()
  @IsString()
  @IsUUID()
  leave_type_id: string;

  @Field()
  @IsString()
  @IsISO8601({ strict: true })
  start_date: string;

  @Field()
  @IsString()
  @IsISO8601({ strict: true })
  end_date: string;
}
