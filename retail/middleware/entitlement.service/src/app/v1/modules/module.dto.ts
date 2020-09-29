import {Field, InputType} from "@nestjs/graphql";
import {IsIn, IsOptional, IsString, MaxLength} from "class-validator";
import {NUMBERS, STATUS} from "@common/constants";

@InputType()
export class ModuleInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  parent_id?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsIn(Object.values(STATUS))
  status?: string;
}

@InputType()
export class ModuleCreateInput extends ModuleInput{
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  name: string;
}
