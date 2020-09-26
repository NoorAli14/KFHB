import { IsString, IsNotEmpty, IsObject, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComplianceDto {
  @ApiProperty({
    required: true,
    description: 'Template result',
  })
  @IsObject()
  @IsNotEmpty()
  results: Record<string, unknown>;

  @ApiProperty({
    required: true,
    description: 'Template Remarks',
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  remarks: string;
}
