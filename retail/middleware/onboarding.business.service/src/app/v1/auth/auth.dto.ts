import { IsString, IsEmail, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {DEVICES, NUMBERS} from '@common/constants';

export class RegisterCustomerDto {
  @ApiProperty({
    title: 'First Name',
    example: 'Faizan',
    description: 'First Name of the customer.',
    required: false,
  })
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  first_name: string;

  @ApiProperty({
    title: 'Middle Name',
    description: 'Middle Name of the customer.',
    required: false,
  })
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  middle_name: string;

  @ApiProperty({
    title: 'Last Name',
    example: 'Ahmad',
    description: 'Last Name of the customer.',
    required: false,
  })
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  last_name: string;

  @ApiProperty({
    required: true,
    example: 'faizan@aiondigital.com',
    description: 'Customer email address.',
  })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'Contact No',
    description: 'Contact No of the customer.',
    required: false,
  })
  @IsOptional()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  contact_no: string;

  @ApiProperty({
    title: 'Device ID',
    description: 'Device ID of the customer.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  device_id: string;

  @ApiProperty({
    enum: DEVICES,
    title: 'Platform',
    example: DEVICES[0],
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(NUMBERS.PLATEFORM_LENGTH)
  platform: string;

  @ApiProperty({
    title: 'FCM Token Id',
    description: 'FCM Token Id',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  fcm_token_id: string;
}
