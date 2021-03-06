import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength } from 'class-validator';
import { USER_STATUSES, GENDER, DEVICES } from '@common/constants';
import { PaginationDTO } from '@root/src/common/dtos';

export class Customer {
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
  last_name: string;

  @ApiProperty({
    title: 'Date of birth',
    description: 'Customer date of birth.',
    example: '1968-11-16',
    required: false,
  })
  @IsOptional()
  date_of_birth: string;

  @ApiProperty({
    title: 'Email',
    example: 'example@aiondigital.com',
    description: 'Email of the customer.',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'Contact No',
    description: 'Contact No of the customer.',
    required: false,
  })
  @IsOptional()
  contact_no: string;

  @ApiProperty({
    enum: GENDER,
    title: 'Gender',
    example: GENDER[0],
    description: 'Gender of the customer.',
    required: false,
  })
  @IsOptional()
  gender: string;

  @ApiProperty({
    title: 'Nationality ID',
    description: 'Nationality ID of the customer.',
    example: '268111605659',
    required: false,
  })
  @IsOptional()
  national_id_no: string;

  @ApiProperty({
    title: 'Nationality ID Expiry',
    description: 'Nationality id expiry of the customer.',
    example: '2021-05-22',
    required: false,
  })
  @IsOptional()
  national_id_expiry: string;

  @ApiProperty({
    title: 'Nationality',
    description: 'Nationality of the customer.',
    example: 'Bahrain',
    required: false,
  })
  @IsOptional()
  nationality: string;

  @ApiProperty({
    title: 'Nationality Code',
    description: 'Nationality code of the customer.',
    example: 'BH',
    required: false,
  })
  @IsOptional()
  nationality_code: string;

  @ApiProperty({
    title: 'Device ID',
    example: '358e380bc0d66abb',
    required: false,
  })
  @IsOptional()
  device_id: string;

  @ApiProperty({
    title: 'FCM Token ID',
    example: '358e380bc0d66abb',
    required: false,
  })
  @IsOptional()
  fcm_token_id: string;

  @ApiProperty({
    enum: DEVICES,
    title: 'Platform',
    example: DEVICES[0],
    required: true,
  })
  @MaxLength(10)
  platform: string;

  @ApiProperty({
    title: 'Last successfully completed step',
    example: 'RBX_ONB_STEP_EMAIL_OTP_SENT',
    required: false,
  })
  @IsOptional()
  last_step: string;

  @ApiProperty({
    enum: USER_STATUSES,
    example: USER_STATUSES[0],
    description: 'Onboarding status of the customer.',
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
  created_by?: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  updated_on?: Date;

  @ApiProperty({ required: false })
  updated_by?: string;
}

export class CustomerPaginationList {
  @ApiProperty({
    type: [Customer],
    description: 'List of all customer.',
    required: true,
  })
  data: Customer[];

  @ApiProperty({
    type: PaginationDTO,
    description: 'Pagination meta data',
    required: true,
  })
  pagination: PaginationDTO;
}
