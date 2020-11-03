import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHolidayDTO {
  @ApiProperty({
    title: 'Holiday Date',
    example: '1947-08-14',
  })
  @IsString()
  @IsOptional()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
  holiday_date: string;

  @ApiProperty({
    required: false,
    example: 'Pakistan Independence Day Holiday',
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  description: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  remarks: string;
}

export class CreateHolidayDto extends UpdateHolidayDTO {
  @ApiProperty({
    title: 'Holiday Date',
    example: '1947-08-14',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
  holiday_date: string;
}
