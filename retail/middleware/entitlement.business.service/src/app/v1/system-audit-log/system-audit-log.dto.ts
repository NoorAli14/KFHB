import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {IsIn, IsOptional, IsUUID} from "@root/node_modules/class-validator";
import {SYSTEM_AUDIT_CODES} from "@rubix/common";

export class SystemAuditLogDTO {
  @ApiProperty({
    title: 'User ID',
    required: false,
    description: 'ID of the logged-in user who is performing the actions',
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  user_id?: string;

  @ApiProperty({
    title: 'Audit Code',
    required: true,
    description: 'Audit Code acts as headline of the event',
  })
  @IsString()
  @IsIn(Object.values(SYSTEM_AUDIT_CODES))
  audit_code: string;

  @ApiProperty({
    title: 'Audit Text',
    required: false,
    description: 'Details of the event',
  })
  @IsString()
  @IsOptional()
  audit_text?: string;
}
