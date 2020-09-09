import { ApiProperty } from '@nestjs/swagger';

export class Nationality {
  @ApiProperty({
    title: 'Nationality ID',
    description: 'Unique Identifier',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
  })
  readonly id: string;

  @ApiProperty({
    title: 'Nationality Name',
    description: 'Name of the nationality',
    example: 'Pakistani',
    required: true,
  })
  name: string;

  @ApiProperty({
    title: 'Country ISO Code',
    description: 'Two characters iso code of the country',
    example: 'PK',
    required: true,
  })
  country_code: string;

  @ApiProperty({
    description: 'Nationality status',
    required: false,
  })
  status: string;

  @ApiProperty({ required: false })
  created_by: string;

  @ApiProperty({ required: false })
  updated_by: string;

  deleted_by: string;

  @ApiProperty({
    description: 'timestamp without time zone',
    required: false,
  })
  created_on: Date;

  @ApiProperty({
    description: 'timestamp without time zone',
    required: false,
  })
  updated_on: Date;

  deleted_on: Date;
}