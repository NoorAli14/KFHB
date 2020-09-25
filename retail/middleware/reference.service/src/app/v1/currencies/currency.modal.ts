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
    example: 'Pakistan Rupee',
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
    title: 'Currency Numeric Code',
    description: 'Numeric code of the currency',
    example: 586,
    required: true,
  })
  numeric_code: number;

  @ApiProperty({
    title: 'Currency Minor Unit',
    description: 'Minor unit of the currency',
    example: 2,
    required: true,
  })
  minor_unit: number;

  status: string;

  created_by: string;

  updated_by: string;

  deleted_by: string;

  created_on: Date;

  updated_on: Date;

  deleted_on: Date;
}