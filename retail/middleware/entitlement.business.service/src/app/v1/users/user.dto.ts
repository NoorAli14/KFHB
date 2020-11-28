import {
  IsString,
  IsOptional,
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  Matches, IsISO8601, MaxLength
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { IdsDto } from '@common/dtos';
import {GENDER, NUMBERS, PASSWORD_REGEX} from '@common/constants';

export class ChangePasswordDto {
  @ApiProperty({
    title: 'Current Password',
    description: 'Enter current password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly current_password: string;

  @ApiProperty({
    title: 'New Password',
    description: 'Enter new password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message: 'password too weak',
  })
  readonly new_password: string;
}

export class NewUserDto {
  @ApiProperty({
    title: 'First Name',
    example: 'Faizan',
    description: 'First Name of the user.',
    required: false,
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({
    title: 'Middle Name',
    description: 'Middle Name of the user.',
    required: false,
  })
  @IsString()
  @IsOptional()
  middle_name?: string;

  @ApiProperty({
    title: 'Last Name',
    example: 'Ahmad',
    description: 'Last Name of the user.',
    required: false,
  })
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty({
    title: 'Email',
    example: 'example@aiondigital.com',
    description: 'Email of the user.',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: GENDER,
    title: 'Gender',
    example: GENDER[0],
    description: 'Gender of the user.',
    required: false,
  })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({
    title: 'Entity ID',
    description: 'ID of the entity with which the User is associated.',
    required: false,
  })
  @IsString()
  @IsOptional()
  entity_id?: string;

  @ApiProperty({
    type: [IdsDto],
    description: 'List of role IDs.',
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => IdsDto)
  roles: IdsDto[];
}

export class UpdateUserDto extends PartialType(
  OmitType(NewUserDto, ['email'] as const),
) { }

export class CurrentUserUpdateDto extends PartialType(
  OmitType(NewUserDto, ['email', 'roles'] as const),
) {
  @ApiProperty({
    title: 'Contact No',
    description: 'Contact No of the user.',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  contact_no?: string;

  @ApiProperty({
    title: 'Date of Birth',
    description: 'Date of Birth of user.',
    example: '1993-12-04',
    required: false,
  })
  @IsString()
  @IsISO8601({ strict: true })
  date_of_birth?: string;

  @ApiProperty({
    title: 'Nationality ID',
    description: 'Nationality Id of the user.',
    required: false,
  })
  @IsString()
  @MaxLength(NUMBERS.NATIONALITY_ID_LENGTH)
  nationality_id: string;
}
