import {Field, InputType} from "@nestjs/graphql";
import {IsOptional, IsString, MaxLength} from "class-validator";

import {NUMBERS} from "@common/constants";
import {IdsInput} from "@common/inputs/ids.input";

@InputType()
export class RoleInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status?: string;

  @Field(type => [IdsInput], { nullable: true })
  permissions?: IdsInput[]; // module_permission_ids
}
