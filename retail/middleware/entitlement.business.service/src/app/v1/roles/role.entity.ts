import { ApiProperty } from '@nestjs/swagger';
import {Module} from '@app/v1/modules/module.entity';
import {ROLE_STATUSES} from '@common/constants';

export class Role {
  @ApiProperty({
    title: 'Role ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
  })
  readonly id: string;

  @ApiProperty({
    title: 'Role Name',
    example: 'Manager',
    description: 'Name of the role',
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'Description about the role.',
  })
  description?: string;
  
  @ApiProperty({ type: [Module], description: 'List of all modules.'})
  modules?: Module[];

  @ApiProperty({
    enum: ROLE_STATUSES,
    example: ROLE_STATUSES[0],
    description: 'Status of the role.',
    required: false
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

  @ApiProperty({
    required: false,
    description: 'timestamp with time zone',
  })
  deleted_on?: Date;
}