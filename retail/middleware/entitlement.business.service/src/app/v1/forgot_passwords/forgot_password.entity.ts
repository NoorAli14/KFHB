import { ApiProperty } from '@nestjs/swagger';

export class Role {
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

  @ApiProperty({
    enum: ['ACTIVE', 'INACTIVE'],
    example: 'ACTIVE',
    description: 'Status of the role.',
  })
  status?: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  created_on?: Date;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  updated_on?: Date;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  deleted_on?: Date;
  // created_by?: string;
  // updated_on?: date;
  // updated_by?: string
  // deleted_on?: date;
  // deleted_by?: string;
}