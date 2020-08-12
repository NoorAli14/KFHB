import {
  IsString,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
 @ApiProperty({
    example: 'Manager',
    description: 'Name of the role',
  })
  @Length(3, 30, {
    message: "Name must be between 3 to 30 characters"
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'Description about the role.',
  })
  description?: string;

  @ApiProperty({
    enum: ['ACTIVE', 'INACTIVE'],
    example: 'ACTIVE',
    description: 'Status of the role.',
  })
  status?: string;
}
