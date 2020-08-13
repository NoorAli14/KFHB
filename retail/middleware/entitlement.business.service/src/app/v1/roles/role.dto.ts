import {
  IsString,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {ROLE_STATUSES} from '@common/constants';

class ModuleIdDto {
  @ApiProperty({
    title: 'Permission ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
    required: true
  })
  readonly id: string;

  @ApiProperty({required: false})
  @IsOptional()
  readonly _deleted?: boolean;
}

export class RoleDto {
 @ApiProperty({
    example: 'Manager',
    description: 'Name of the role',
  })
  @Length(3, 30, {
    message: "Name must be between 3 to 96 characters"
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'Description about the role.',
  })
  description?: string;

  @ApiProperty({ type: [ModuleIdDto], description: 'List of module IDs.'  })
  modules?: ModuleIdDto[];
}
