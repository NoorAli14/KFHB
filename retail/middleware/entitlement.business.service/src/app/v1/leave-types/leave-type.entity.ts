import { ApiProperty } from '@nestjs/swagger';

export class LeaveType {
  @ApiProperty({
    title: 'Leave Type ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
  })
  readonly id: string;

  @ApiProperty({
    required: false,
  })
  leave_type: string;

  @ApiProperty({
    required: false,
  })
  status: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  created_on: string;

  @ApiProperty({ required: false })
  created_by: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  updated_on: string;

  @ApiProperty({ required: false })
  updated_by: string;
}
