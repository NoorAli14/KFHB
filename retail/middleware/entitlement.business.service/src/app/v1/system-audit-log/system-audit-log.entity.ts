import { ApiProperty } from '@nestjs/swagger';
import {IsIn, IsOptional, IsString, IsUUID} from "class-validator";
import {PaginationDTO, SYSTEM_AUDIT_CODES} from "@rubix/common";
import {Module} from "@app/v1/modules/module.entity";
import {User} from "@app/v1/users/user.entity";

export class SystemAuditLog {
  @ApiProperty({
    title: 'System Audit Log ID',
    description: 'Unique Identifier',
    required: true
  })
  @IsString()
  @IsUUID()
  readonly id: string;

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
    title: 'Tenant ID',
    required: true,
    description: 'Tenant ID',
  })
  @IsString()
  @IsUUID()
  tenant_id: string;

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

  @ApiProperty({
    title: 'Created On',
    required: true,
    description: 'timestamp with time zone',
  })
  @IsString()
  created_on: string;

  @ApiProperty({
    title: 'Created By',
    required: true,
    description: 'SYSTEM always',
  })
  @IsString()
  created_by: string;

  @ApiProperty({
    type: User,
    description: 'User object in detail',
    required: false,
  })
  @IsOptional()
  user?: User;
}

export class SALPaginationList {
  @ApiProperty({
    type: [SystemAuditLog],
    description: 'List of all System Audit Logs.',
    required: true,
  })
  data: SystemAuditLog[];

  @ApiProperty({
    type: PaginationDTO,
    description: 'Pagination meta data',
    required: true,
  })
  pagination: PaginationDTO;
}
