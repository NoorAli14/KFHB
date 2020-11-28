import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsDate } from 'class-validator';
import { USER_STATUSES, GENDER } from '@common/constants';
import { Module } from '@app/v1/modules/module.entity';
import { PaginationDTO } from "@common/dtos";

export class User {
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
    title: 'Contact No',
    description: 'Contact No of the user.',
    required: false,
  })
  @IsOptional()
  contact_no?: string;

  @ApiProperty({
    enum: GENDER,
    title: 'Gender',
    example: GENDER[0],
    description: 'Gender of the user.',
    required: false,
  })
  @IsOptional()
  gender?: string;

  @ApiProperty({
    title: 'Date of Birth',
    description: 'Date of Birth of user.',
    required: false,
  })
  @IsOptional()
  @IsDate()
  date_of_birth?: string;

  @ApiProperty({
    title: 'Nationality ID',
    description: 'Nationality Id of the user.',
    required: false,
  })
  @IsOptional()
  nationality_id?: string;

  @ApiProperty({
    title: 'Entity ID',
    description: 'Entity Id of the user.',
    required: false,
  })
  @IsOptional()
  entity_id?: string;

  @ApiProperty({
    enum: USER_STATUSES,
    example: USER_STATUSES[0],
    description: 'Status of the user.',
    required: false,
  })
  @IsOptional()
  status?: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  created_on?: Date;

  @ApiProperty({
    type: [Module],
    description: 'List of all modules.',
    required: false,
  })
  modules?: Module[];

  @ApiProperty({ required: false })
  created_by?: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  updated_on?: Date;

  @ApiProperty({ required: false })
  updated_by?: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  deleted_on?: Date;

  @ApiProperty({ required: false })
  deleted_by?: string;
}

export class UserWithModule extends User {
  @ApiProperty({
    type: [Module],
    description: 'List of all modules.',
    required: false,
  })
  modules?: Module[];
}

export class UserPaginationList {
  @ApiProperty({
    type: [User],
    description: 'List of all Users.',
    required: true,
  })
  data: User[];

  @ApiProperty({
    type: PaginationDTO,
    description: 'Pagination meta data',
    required: true,
  })
  pagination: PaginationDTO;
}
