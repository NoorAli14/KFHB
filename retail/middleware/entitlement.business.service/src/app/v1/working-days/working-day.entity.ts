import { ApiProperty } from '@nestjs/swagger';
import { USER_STATUSES } from '@common/constants';

export class WorkingDay {
  @ApiProperty({
    title: 'Working Day ID',
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
    title: 'Start time',
    example: '1100',
  })
  start_time_local: string;

  @ApiProperty({
    required: false,
    title: 'End time',
    example: '1700',
  })
  end_time_local: string;

  @ApiProperty({
    required: false,
    enum: [0, 1],
    example: 1,
  })
  full_day: number;

  @ApiProperty({
    required: false,
  })
  remarks: string;

  @ApiProperty({
    enum: USER_STATUSES,
    example: USER_STATUSES[0],
    description: 'Status of working day.',
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
