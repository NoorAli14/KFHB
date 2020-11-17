import {
  IsString,
  IsOptional,
  MaxLength,
  IsIn,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {GENDER, NUMBERS, PASSWORD_REGEX} from '@common/constants';

export class UpdateInvitationDto {
  @ApiProperty({
    title: 'First Name',
    example: 'Faizan',
    description: 'First Name of the user.',
    required: true,
  })
  @IsString()
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  first_name?: string;

  @ApiProperty({
    title: 'Middle Name',
    description: 'Middle Name of the user.',
    required: false,
  })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
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
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
  last_name: string;

  @ApiProperty({
    title: 'Contact No',
    description: 'Contact No of the user.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contact_no: string;

  @ApiProperty({
    title: 'Date of Birth',
    description: 'Date of Birth of user.',
    required: true,
  })
  @IsString()
  date_of_birth: string;

  @ApiProperty({
    title: 'Nationality ID',
    description: 'Nationality Id of the user.',
    required: true,
  })
  @IsString()
  @MaxLength(NUMBERS.NATIONALITY_ID_LENGTH)
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
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    title: 'Password',
    description: 'User Password.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message: 'password too weak',
  })
  readonly password: string;
}
