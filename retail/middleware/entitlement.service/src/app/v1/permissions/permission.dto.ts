import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';
import { NUMBERS } from '@common/constants';

@InputType()
export class PermissionInput {
  @Field()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  record_type: string;
}
