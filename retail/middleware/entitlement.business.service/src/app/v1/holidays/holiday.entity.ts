import { ApiProperty } from '@nestjs/swagger';
import { USER_STATUSES } from '@common/constants';

export class Holiday {
  @ApiProperty({
    title: 'Holiday ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
  })
  readonly id: string;

  @ApiProperty({
    title: 'Holiday Date',
    example: '1947-08-14',
    required: true
  })
  holiday_date: string;

  @ApiProperty({
    required: false,
    example: 'Pakistan Independence Day Holiday',
  })
  description: string;

  @ApiProperty({
    required: false,
  })
  remarks: string;

  @ApiProperty({
    enum: USER_STATUSES,
    example: USER_STATUSES[0],
    description: 'Holiday status',
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
