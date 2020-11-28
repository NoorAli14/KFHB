import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsOptional, MaxLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IdsDto } from '@common/dtos';
import { Type } from 'class-transformer';
import {NUMBERS} from "@rubix/common";

export class RoleDto {
  @ApiProperty({
    example: 'Manager',
    description: 'Name of the role',
  })
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
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
  @MaxLength(NUMBERS.MAX_COLUMN_LENGTH)
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