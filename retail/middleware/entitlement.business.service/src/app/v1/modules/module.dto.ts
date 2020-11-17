import {IsOptional, MaxLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {IdsDto} from '@common/dtos'
import {NUMBERS} from "@rubix/common";

export class ModuleDto {
 @ApiProperty({
    example: 'User Management',
    description: 'Name of the module',
    required: true
  })
 @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  name: string;

  @ApiProperty({
    required: false,
    description: 'Parent ID of module.',
  })
  @IsOptional()
  parent_id?: string;

  @ApiProperty({ type: [IdsDto], description: 'List of permission IDs.'  })
  permissions?: IdsDto[];
}