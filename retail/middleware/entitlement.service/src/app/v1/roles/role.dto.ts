import {Field, InputType} from "@nestjs/graphql";
import {IsBoolean, IsOptional, IsString, MaxLength} from "class-validator";

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

  @Field(type => [ModulesInput], { nullable: true })
  modules?: ModulesInput[];
}

@InputType()
export class ModulesInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  _deleted?: boolean;

  @Field(type => [IdsInput], { nullable: true })
  @IsOptional()
  permissions?: IdsInput[];
}
