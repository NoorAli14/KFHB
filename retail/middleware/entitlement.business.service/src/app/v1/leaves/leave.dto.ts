import { IsString, MaxLength, IsUUID, IsOptional, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLeaveDto {
  @ApiProperty({
    title: 'User ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a12',
    description: 'Unique Identifier',
  })
  @IsUUID()
  @IsOptional()
  user_id: string;

  @ApiProperty({
    title: 'Leave Type ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a12',
    description: 'Unique Identifier',
  })
  @IsUUID()
  @IsOptional()
  leave_type_id: string;

  @ApiProperty({
    title: 'Start Date',
    example: '1947-08-14',
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
  start_date: string;

  @ApiProperty({
    title: 'End Date',
    example: '1947-08-20',
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
  end_date: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  remarks: string;
}

export class CreateLeaveDto extends UpdateLeaveDto {
  @ApiProperty({
    title: 'User ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a12',
    description: 'Unique Identifier',
  })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    title: 'Leave Type ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a12',
    description: 'Unique Identifier',
  })
  @IsUUID()
  @IsNotEmpty()
  leave_type_id: string;

  @ApiProperty({
    title: 'Start Date',
    example: '1947-08-14',
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
  start_date: string;

  @ApiProperty({
    title: 'End Date',
    example: '1947-08-20',
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @Matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
  end_date: string;
}