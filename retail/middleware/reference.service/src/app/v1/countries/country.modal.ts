import { ApiProperty } from '@nestjs/swagger';

export class Country {
  @ApiProperty({
    title: 'Country ID',
    description: 'Unique Identifier',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
  })
  readonly id: string;

  @ApiProperty({
    title: 'Country Name',
    description: 'Name of the country',
    example: 'Pakistan',
    required: true,
  })
  name: string;

  @ApiProperty({
    title: 'ISO Code',
    description: 'Two characters iso code of the country',
    example: 'PK',
    required: true,
  })
  iso_code: string;

  @ApiProperty({
    title: 'Continent Code',
    description: 'Continent code of the country',
    example: 'AS',
    required: true,
  })
  continent_code: string;

  @ApiProperty({
    title: 'Capital Name',
    description: 'Capital name of the country',
    example: 'Islamabad',
    required: true,
  })
  capital_name: string;

  @ApiProperty({
    title: 'Phone Code',
    description: 'Phone code of the country',
    example: '92',
    required: true,
  })
  phone_code: string;

  @ApiProperty({
    title: 'Currency Code',
    description: 'Currency code of the country',
    example: 'PKR',
    required: true,
  })
  contact_no: string;

  @ApiProperty({
    description: 'Country status',
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