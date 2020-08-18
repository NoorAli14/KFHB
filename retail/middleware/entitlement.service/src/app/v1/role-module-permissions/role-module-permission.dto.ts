import {Field, InputType} from "@nestjs/graphql";
import {IsOptional, IsString, MaxLength} from "class-validator";
import {NUMBERS} from "@common/constants";

@InputType()
export class RoleModulePermissionInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  role_module_id: string;

  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  permission_id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  status?: string;
}
