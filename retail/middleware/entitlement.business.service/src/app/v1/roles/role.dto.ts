import {
  IsNotEmpty,
  Length,
  IsString,
  ValidateNested,
  IsOptional
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IdsDto } from '@common/dtos';
import { Type } from 'class-transformer';

export class RoleDto {
  @ApiProperty({
    example: 'Manager',
    description: 'Name of the role',
  })
  @Length(3, 30, {
    message: 'Name must be between 3 to 96 characters',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
    description: 'Description about the role.',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    type: [IdsDto],
    description: 'List of Module Permission IDs.',
  })
  @ValidateNested({ each: true })
  @Type(() => IdsDto)
  permissions: IdsDto[];
}

export class UpdateRoleDto extends RoleDto {
  @ApiProperty({
    example: 'Manager',
    description: 'Name of the role',
  })
  @Length(3, 30, {
    message: 'Name must be between 3 to 96 characters',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
    description: 'Description about the role.',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    type: [IdsDto],
    description: 'List of Module Permission IDs.',
  })
  @ValidateNested({ each: true })
  @Type(() => IdsDto)
  @IsOptional()
  permissions: IdsDto[];
}