import { Field, InputType } from "@nestjs/graphql";
import {IsISO8601, IsOptional, IsString, IsUUID, MaxLength} from "class-validator";

import { NUMBERS } from "@common/constants";

@InputType()
export class LeaveInput {
  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  @IsUUID()
  user_id: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  @IsUUID()
  leave_type_id: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  @IsISO8601({strict: true})
  start_date: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  @IsISO8601({strict: true})
  end_date: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  remarks: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status: string;
}

@InputType()
export class LeaveCreateInput extends LeaveInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  user_id: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsUUID()
  leave_type_id: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsISO8601({strict: true})
  start_date: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsISO8601({strict: true})
  end_date: string;
}
