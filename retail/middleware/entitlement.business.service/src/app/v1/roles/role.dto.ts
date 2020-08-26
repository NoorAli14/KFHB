import { IsNotEmpty, Length, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IdsDto } from '@common/dtos';

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
  description?: string;

  @ApiProperty({ type: [IdsDto], description: 'List of module IDs.' })
  modules?: IdsDto[];
}
