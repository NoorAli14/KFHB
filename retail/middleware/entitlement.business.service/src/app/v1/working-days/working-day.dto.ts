import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WorkingDayDTO {
  @ApiProperty({
    title: 'Working day name',
    example: 'MONDAY',
    required: false,
  })
  @IsString()
  @MaxLength(10)
  week_day: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  end_time_local: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  start_time_local: string;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  full_day: number;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  remarks: string;
}
