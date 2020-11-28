import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsISO8601, IsOptional, IsString, MaxLength } from 'class-validator';
import { GENDER, NUMBERS, USER_STATUSES } from "@common/constants";

export class CustomerFilterDTO {
  @ApiProperty({
    title: 'First Name',
    example: 'Faizan',
    description: 'First Name of the user.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  first_name: string;

  @ApiProperty({
    title: 'Middle Name',
    description: 'Middle Name of the user.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  middle_name: string;

  @ApiProperty({
    title: 'Last Name',
    example: 'Ahmad',
    description: 'Last Name of the user.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  last_name: string;

  @ApiProperty({
    title: 'Date of birth',
    description: 'Customer date of birth.',
    example: '1968-11-16',
    required: false,
  })
  @IsString()
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
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
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
  @IsIn(GENDER)
  gender: string;

  @ApiProperty({
    title: 'Nationality ID',
    description: 'Nationality ID of the customer.',
    example: '268111605659',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(NUMBERS.NATIONALITY_ID_LENGTH)
  national_id_no: string;

  @ApiProperty({
    title: 'Nationality ID Expiry',
    description: 'Nationality id expiry of the customer.',
    example: '2021-05-22',
    required: false,
  })
  @IsString()
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
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
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
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  nationality_code: string;

  @ApiProperty({
    title: 'Last successfully completed step',
    example: 'RBX_ONB_STEP_EMAIL_OTP_SENT',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
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
