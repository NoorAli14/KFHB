import {IsOptional, Length} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {IdsDto} from '@common/dtos'

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

  @ApiProperty({ type: [IdsDto], description: 'List of permission IDs.'  })
  permissions?: IdsDto[];
}