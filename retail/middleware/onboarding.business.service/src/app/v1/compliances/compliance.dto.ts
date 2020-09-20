import { IsString, IsNotEmpty, IsObject } from 'class-validator';
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
  @IsNotEmpty()
  remarks: string;
}
