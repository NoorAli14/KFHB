import { IsNumber, IsOptional, IsString, MaxLength, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LeaveDTO {
  @ApiProperty({
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  leave_type_id: string;
    
  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  leave_type: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  leave_duration: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  leave_date: string;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  is_repetitive: number;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  remarks: string;
}
