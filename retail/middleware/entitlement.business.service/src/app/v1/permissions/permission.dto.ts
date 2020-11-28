import { ApiProperty } from '@nestjs/swagger';
import {IsString, MaxLength} from 'class-validator';
import {NUMBERS} from "@rubix/common";

export class PermissionDto {
  @ApiProperty({
    title: 'Permission type',
    example: 'users:create',
    description: 'Name of the permission',
  })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsString()
  record_type: string;
}
