import {
  IsString,
  Length,
  IsEmail,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    required: true,
    example: 'faizan@aiondigital.com',
    description: 'User email address.',
  })
  @Length(3, 96, {
    message: 'Name must be between 3 to 30 characters',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    description: 'User Password',
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterCustomerDto {
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
    required: true,
    example: 'faizan@aiondigital.com',
    description: 'Customer email address.',
  })
  @Length(3, 96, {
    message: 'Name must be between 3 to 30 characters',
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

  // @ApiProperty({
  //   enum: GENDER,
  //   title: 'Gender',
  //   example: GENDER[0],
  //   description: 'Gender of the user.',
  //   required: false,
  // })
  // @IsOptional()
  // gender?: string;
}
