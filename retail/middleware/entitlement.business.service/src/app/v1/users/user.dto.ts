import {
  IsString,
  IsOptional,
  Length,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IdsDto } from '@common/dtos';
import { GENDER } from '@common/constants';

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
  readonly new_password: string;
}

export class UpdateUserDto {
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
    type: [IdsDto],
    description: 'List of role IDs.',
    required: false,
  })
  roles?: IdsDto[];
}
