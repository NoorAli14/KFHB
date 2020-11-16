import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { NUMBERS, SYSTEM_AUDIT_CODES } from '@common/constants';
import { CreatedOnParams } from '@common/dtos';

@InputType()
export class SALFilterParams {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsIn(Object.keys(SYSTEM_AUDIT_CODES))
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  audit_code: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  audit_text: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUUID()
  user_id: string;

  @Field(() => CreatedOnParams, { nullable: true })
  @IsOptional()
  created_on: CreatedOnParams;
}
