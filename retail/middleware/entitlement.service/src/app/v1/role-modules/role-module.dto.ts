import {Field, InputType} from "@nestjs/graphql";
import {IsOptional, IsString, MaxLength} from "class-validator";
import {NUMBERS} from "@common/constants";

@InputType()
export class RoleModuleInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  module_id: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  role_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status?: string;
}
