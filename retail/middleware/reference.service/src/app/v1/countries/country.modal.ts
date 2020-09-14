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
    title: 'Nationality Name',
    description: 'Nationality of the country',
    example: 'Pakistani',
    required: true,
  })
  nationality: string;

  status: string;

  created_by: string;

  updated_by: string;

  deleted_by: string;

  created_on: Date;

  updated_on: Date;

  deleted_on: Date;
}