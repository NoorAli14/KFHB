import { ApiProperty } from '@nestjs/swagger';

export class Currency {
  @ApiProperty({
    title: 'Currency ID',
    description: 'Unique Identifier',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
  })
  readonly id: string;

  @ApiProperty({
    title: 'Currency Name',
    description: 'Name of the currency',
    example: 'Pakistani Rupee',
    required: true,
  })
  name: string;

  @ApiProperty({
    title: 'Currency ISO Code',
    description: 'Three characters iso code of currency',
    example: 'PKR',
    required: true,
  })
  iso_code: string;

  @ApiProperty({
    title: 'Country ISO Code',
    description: 'Two characters iso code of the country',
    example: 'PK',
    required: true,
  })
  country_code: string;

  @ApiProperty({
    description: 'Currency status',
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