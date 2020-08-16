import {
  IsString,
  IsOptional,
  Length,
  MaxLength,
  MinLength,
  IsDate,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GENDER } from '@common/constants';

export class UpdateInvitationDto {
  @ApiProperty({
    title: 'First Name',
    example: 'Faizan',
    description: 'First Name of the user.',
    required: true,
  })
  @IsString()
  @Length(3, 255, {
    message: 'First name must be between 3 and 255 characters',
  })
  first_name?: string;

  @ApiProperty({
    title: 'Middle Name',
    description: 'Middle Name of the user.',
    required: false,
  })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  middle_name?: string;

  @ApiProperty({
    title: 'Last Name',
    example: 'Ahmad',
    description: 'Last Name of the user.',
    required: true,
  })
  @IsString()
  @Length(3, 255, {
    message: 'Last name must be between 3 and 255 characters',
  })
  last_name: string;

  @ApiProperty({
    title: 'Username',
    description: 'username of the user.',
    required: false,
  })
  @IsOptional()
  username?: string;

  @ApiProperty({
    title: 'Contact No',
    description: 'Contact No of the user.',
    required: true,
  })
  @IsString()
  contact_no: string;

  @ApiProperty({
    title: 'Date of Birth',
    description: 'Date of Birth of user.',
    required: true,
  })
  @IsDate()
  date_of_birth: string;

  @ApiProperty({
    title: 'Nationality ID',
    description: 'Nationality Id of the user.',
    required: true,
  })
  @IsString()
  @MaxLength(36)
  nationality_id: string;

  @ApiProperty({
    enum: GENDER,
    title: 'Gender',
    example: GENDER[0],
    description: 'Gender of the user.',
    required: true,
  })
  @IsIn(GENDER)
  @IsString()
  gender?: string;

  @ApiProperty({
    title: 'Password',
    description: 'User Password.',
    required: true,
  })
  @IsString()
  @MinLength(6)
  password: string;
}