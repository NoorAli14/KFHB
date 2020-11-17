import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  MaxLength,
} from 'class-validator';
import {MODULE_STATUSES, NUMBERS} from '@common/constants';
import {Permission} from '@app/v1/permissions/permission.entity';

export class Module {
  @ApiProperty({
    title: 'Module ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
  })
  readonly id: string;

  @ApiProperty({
    example: 'User Management',
    description: 'Name of the module',
    required: true
  })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  name: string;

  @ApiProperty({
    required: false,
    description: 'Parent ID of the module.',
  })
  @IsOptional()
  @IsString()
  parent_id?: string;

  @ApiProperty({ type: Module, description: 'Parent module.' })
  parent?: Module;

  @ApiProperty({ type: [Module], description: 'List of all sub modules.' })
  sub_modules?: Module[];


  @ApiProperty({ type: [Permission], description: 'List of all permissions.'  })
  permissions?: Permission[];

  @ApiProperty({
    enum: MODULE_STATUSES,
    example: MODULE_STATUSES[0],
    description: 'Status of the module.',
  })
  status?: string;

  @ApiProperty({
    required: false,
    description: 'timestamp with time zone',
  })
  created_on?: Date;

  @ApiProperty({
    required: false,
    description: 'timestamp with time zone',
  })
  updated_on?: Date;
}