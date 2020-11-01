import { ApiProperty } from '@nestjs/swagger';
import { GENDER, USER_STATUSES } from '@root/src/common';
import { IsIn, IsISO8601, IsOptional, IsString, MaxLength } from 'class-validator';

export class CustomerFilterDTO {
  @ApiProperty({
    title: 'First Name',
    example: 'Faizan',
    description: 'First Name of the user.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  first_name: string;

  @ApiProperty({
    title: 'Middle Name',
    description: 'Middle Name of the user.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  middle_name: string;

  @ApiProperty({
    title: 'Last Name',
    example: 'Ahmad',
    description: 'Last Name of the user.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  last_name: string;

  @ApiProperty({
    title: 'Date of birth',
    description: 'Customer date of birth.',
    example: '1968-11-16',
    required: false,
  })
  @IsString()
  @MaxLength(20)
  @IsOptional()
  @IsISO8601({ strict: true })
  date_of_birth: string;

  @ApiProperty({
    title: 'Email',
    example: 'example@aiondigital.com',
    description: 'Email of the customer.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
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
  @IsString()
  gender: string;

  @ApiProperty({
    title: 'Nationality ID',
    description: 'Nationality ID of the customer.',
    example: '268111605659',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  national_id_no: string;

  @ApiProperty({
    title: 'Nationality ID Expiry',
    description: 'Nationality id expiry of the customer.',
    example: '2021-05-22',
    required: false,
  })
  @IsString()
  @MaxLength(20)
  @IsOptional()
  @IsISO8601({ strict: true })
  national_id_expiry: string;

  @ApiProperty({
    title: 'Nationality',
    description: 'Nationality of the customer.',
    example: 'Bahrain',
    required: false,
  })
  @IsOptional()
  @IsString()
  nationality: string;

  @ApiProperty({
    title: 'Nationality Code',
    description: 'Nationality code of the customer.',
    example: 'BH',
    required: false,
  })
  @IsOptional()
  @IsString()
  nationality_code: string;

  @ApiProperty({
    title: 'Last successfully completed step',
    example: 'RBX_ONB_STEP_EMAIL_OTP_SENT',
    required: false,
  })
  @IsOptional()
  @IsString()
  last_step: string;

  @ApiProperty({
    enum: USER_STATUSES,
    example: USER_STATUSES[0],
    description: 'Onboarding status of the customer.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(Object.keys(USER_STATUSES))
  status: string;
}
