import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString } from 'class-validator';
import { USER_STATUSES, GENDER } from '@common/constants';

export class Appointment {
  @ApiProperty({
    title: 'Appointment ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
  })
  readonly id: string;

  @ApiProperty({
    title: 'Call Time',
    description: 'Current Date and time',
    example: '2020-10-07T14:48:00.000Z',
    required: true,
  })
  @IsString()
  @IsISO8601({ strict: true })
  call_time: string;

  @ApiProperty({
    title: 'Middle Name',
    description: 'Middle Name of the user.',
    required: false,
  })
  @IsOptional()
  user_id?: string;

  @ApiProperty({
    enum: GENDER,
    title: 'Gender',
    example: GENDER[0],
    description: 'Preferred Gender',
    required: false,
  })
  @IsOptional()
  gender: string;

  @ApiProperty({
    enum: USER_STATUSES,
    example: USER_STATUSES[0],
    description: 'Status of the user.',
    required: false,
  })
  @IsOptional()
  status: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  created_on?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  created_by: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  @IsOptional()
  updated_on: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  updated_by: string;
}
