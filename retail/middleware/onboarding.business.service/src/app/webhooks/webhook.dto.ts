import {
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AMLAlertDTO {
  @ApiProperty({
    title: 'Reference No',
    description: 'AML request reference no',
    example: "1581795827563",
    required: true,
  })
  @IsNumberString()
  reference_no: string;

  @ApiProperty({
    title: 'Reference code',
    description: 'AML request reference code',
    example: "0000",
    required: true,
  })
  @IsString()
  @MaxLength(10)
  response_code: string;

  @ApiProperty({
    title: 'User ID',
    description: 'Unique Id of the user.',
    required: true,
  })
  @IsString()
  status: string;
}