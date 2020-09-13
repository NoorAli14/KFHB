import { ApiProperty } from '@nestjs/swagger';
import { USER_STATUSES } from '@common/constants';

export class WorkingDay {
  @ApiProperty({
    title: 'User ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
  })
  readonly id: string;

  @ApiProperty({
    title: 'Working day name',
    example: 'MONDAY',
  })
  week_day: string;

  @ApiProperty({
    required: false,
  })
  end_time: string;

  @ApiProperty({
    required: false,
  })
  start_time: string;

  @ApiProperty({
    required: false,
  })
  full_day: number;

  @ApiProperty({
    required: false,
  })
  remarks: string;

  @ApiProperty({
    enum: USER_STATUSES,
    example: USER_STATUSES[0],
    description: 'Status of the user.',
    required: false,
  })
  status: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  created_on: Date;

  @ApiProperty({ required: false })
  created_by: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  updated_on: Date;

  @ApiProperty({ required: false })
  updated_by: string;
}
