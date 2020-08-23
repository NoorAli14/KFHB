import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class PermissionDto {
  @ApiProperty({
    title: 'Permission type',
    example: 'users:create',
    description: 'Name of the permission',
  })
  @IsString()
  @Length(3, 28, {
    message: 'Name must be between 3 and 28 characters',
  })
  record_type: string;
}
