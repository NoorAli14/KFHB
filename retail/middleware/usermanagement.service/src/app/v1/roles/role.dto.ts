import { Field, InputType } from '@nestjs/graphql';
import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

import { NUMBERS, STATUS } from '@common/constants';
import { IdsInput } from '@common/inputs/ids.input';
import { Type } from 'class-transformer';

@InputType()
export class RoleInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.values(STATUS))
  status?: string;

  @Field(() => [IdsInput], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => IdsInput)
  permissions?: IdsInput[]; // module_permission_ids
}

@InputType()
export class RoleCreateInput extends RoleInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  name: string;
}
