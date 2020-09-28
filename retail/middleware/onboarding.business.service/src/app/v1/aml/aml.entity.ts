import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AML {
  @ApiProperty({
    title: 'Aml Request ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
  })
  readonly id: string;

  @ApiProperty({
    title: 'Request Reference',
    required: false,
  })
  @IsOptional()
  request_reference: string;


  @ApiProperty({
    enum: ['CLEAN', 'SUSPECT', 'BLOCK'],
    example: 'CLEAN',
    description: 'Status of the aml.',
    required: false,
  })
  @IsOptional()
  status: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  created_on?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  created_by: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  @IsOptional()
  updated_on: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  updated_by: string;
}