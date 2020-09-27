import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
import { USER_STATUSES, GENDER } from '@common/constants';

export class User {
  @ApiProperty({
    title: 'User ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
  })
  readonly id: string;

  @ApiProperty({
    title: 'First Name',
    example: 'Faizan',
    description: 'First Name of the user.',
    required: false,
  })
  @IsOptional()
  first_name?: string;

  @ApiProperty({
    title: 'Middle Name',
    description: 'Middle Name of the user.',
    required: false,
  })
  @IsOptional()
  middle_name?: string;

  @ApiProperty({
    title: 'Last Name',
    example: 'Ahmad',
    description: 'Last Name of the user.',
    required: false,
  })
  @IsOptional()
  last_name?: string;

  @ApiProperty({
    title: 'Username',
    description: 'username of the user.',
    required: false,
  })
  @IsOptional()
  username?: string;

  @ApiProperty({
    title: 'Email',
    example: 'example@aiondigital.com',
    description: 'Email of the user.',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'Contact No',
    description: 'Contact No of the user.',
    required: false,
  })
  @IsOptional()
  contact_no?: string;

  @ApiProperty({
    enum: GENDER,
    title: 'Gender',
    example: GENDER[0],
    description: 'Gender of the user',
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