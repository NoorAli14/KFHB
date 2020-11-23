import { ApiProperty } from '@nestjs/swagger';
import {IsIn, IsOptional, IsString, IsUUID} from 'class-validator';
import { Type } from "class-transformer";
import {CreatedOnDTO, SYSTEM_AUDIT_CODES} from "@rubix/common";

export class SystemAuditLogFilterDto {
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
        required: false,
        description: 'Audit Code acts as headline of the event',
    })
    @IsString()
    @IsIn(Object.values(SYSTEM_AUDIT_CODES))
    @IsOptional()
    audit_code?: string;

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
        description: 'apply a range filter on the created_on column by providing a start and end value',
        required: false,
    })
    @IsOptional()
    @Type(() => CreatedOnDTO)
    created_on?: CreatedOnDTO;
}

