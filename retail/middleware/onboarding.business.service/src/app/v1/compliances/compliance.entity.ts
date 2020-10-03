import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class Template {
  @ApiProperty({
    title: 'Permission ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
  })
  readonly id: string;

  @ApiProperty({
    required: true,
    title: 'Permission type',
    example: 'create | update or delete',
    description: 'Name of the permission',
  })
  @IsString()
  @IsNotEmpty()
  record_type: string;

  @ApiProperty({
    required: false,
    description: 'timestamp with time zone',
  })
  created_on?: Date;
}
