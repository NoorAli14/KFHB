import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HolidayDTO {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @MaxLength(255)
  holiday_description: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  holiday_date: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  remarks: string;
}
