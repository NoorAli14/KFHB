import {Field, InputType} from "@nestjs/graphql";
import {IsOptional, IsString, MaxLength} from "class-validator";
import {NUMBERS} from "@common/constants";

@InputType()
export class ModuleInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  parent_id?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status?: string;
}
