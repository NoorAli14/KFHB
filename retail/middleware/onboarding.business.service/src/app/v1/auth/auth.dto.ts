import { IsString, Length, IsEmail, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DEVICES } from '@common/constants';

export class RegisterCustomerDto {
  @ApiProperty({
    title: 'First Name',
    example: 'Faizan',
    description: 'First Name of the customer.',
    required: false,
  })
  @IsOptional()
  @MaxLength(255)
  first_name: string;

  @ApiProperty({
    title: 'Middle Name',
    description: 'Middle Name of the customer.',
    required: false,
  })
  @IsOptional()
  @MaxLength(255)
  middle_name: string;

  @ApiProperty({
    title: 'Last Name',
    example: 'Ahmad',
    description: 'Last Name of the customer.',
    required: false,
  })
  @IsOptional()
  @MaxLength(255)
  last_name: string;

  @ApiProperty({
    required: true,
    example: 'faizan@aiondigital.com',
    description: 'Customer email address.',
  })
  @Length(3, 96, {
    message: 'Email must be between 3 to 30 characters',
    context: {
      errorCode: 1003,
      developerNote: 'The validated string must contain 32 or more characters.',
    },
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'Contact No',
    description: 'Contact No of the customer.',
    required: false,
  })
  @IsOptional()
  @MaxLength(20)
  contact_no: string;

  @ApiProperty({
    title: 'Device ID',
    description: 'Device ID of the customer.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  device_id: string;

  @ApiProperty({
    enum: DEVICES,
    title: 'Platform',
    example: DEVICES[0],
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  platform: string;

  @ApiProperty({
    title: 'FCM Token Id',
    description: 'FCM Token Id',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  fcm_token_id: string;
}
