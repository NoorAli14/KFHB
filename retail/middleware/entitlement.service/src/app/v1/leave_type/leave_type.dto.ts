import { Field, InputType } from "@nestjs/graphql";
import {IsOptional, IsString, MaxLength} from "class-validator";

import { NUMBERS } from "@common/constants";

@InputType()
export class LeaveTypeInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  leave_type?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status?: string;
}

@InputType()
export class LeaveTypeCreateInput extends LeaveTypeInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  leave_type: string;
}
