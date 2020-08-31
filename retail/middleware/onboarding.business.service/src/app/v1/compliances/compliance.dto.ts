import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComplianceDto {
  @ApiProperty({
    required: true,
    description: 'Template result',
  })
  @IsString()
  @IsNotEmpty()
  results: string;

  @ApiProperty({
    required: true,
    description: 'Template Remarks',
  })
  @IsString()
  @IsNotEmpty()
  remarks: string;
}
