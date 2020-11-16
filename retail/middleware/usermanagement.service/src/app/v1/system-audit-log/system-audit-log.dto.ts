import { Field, InputType } from '@nestjs/graphql';
import { IsIn, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

import { NUMBERS, SYSTEM_AUDIT_CODES } from '@common/constants';

@InputType()
export class SystemAuditLogInput {
  @Field({ nullable: true })
  @IsString()
  @IsUUID()
  @IsOptional()
  user_id?: string;

  @Field()
  @IsString()
  @IsIn(Object.values(SYSTEM_AUDIT_CODES))
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  audit_code?: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsOptional()
  audit_text?: string;
}
