import {
  IsOptional,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class permissionIdDto {
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

export class ModuleDto {
 @ApiProperty({
    example: 'User Management',
    description: 'Name of the module',
    required: true
  })
  @Length(3, 30, {
    message: "Name must be between 3 to 96 characters"
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'Parent ID of module.',
  })
  @IsOptional()
  parent_id?: string;

  @ApiProperty({ type: [permissionIdDto], description: 'List of permission IDs.'  })
  permissions?: permissionIdDto[];
}