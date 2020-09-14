import { IsString, IsNotEmpty, IsJSON } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComplianceDto {
  @ApiProperty({
    required: true,
    description: 'Template result',
  })
  @IsJSON()
  @IsNotEmpty()
  results: any;

  @ApiProperty({
    required: true,
    description: 'Template Remarks',
  })
  @IsString()
  @IsNotEmpty()
  remarks: string;
}
