import { ApiProperty } from '@nestjs/swagger';
import { DOCUMENT_STATUSES, EVALUATION_STATUSES } from '@common/index';

export class Document {
  @ApiProperty({
    title: 'Document ID',
    example: '3dfdecc1-a616-4817-a841-61d824d82a13',
    description: 'Unique Identifier',
  })
  readonly id: string;

  @ApiProperty({
    title: 'Session ID',
    example: '7315F39A-CBE5-48D0-BD8C-26E4F8B8A4D2',
    description: 'Unique Identifier',
  })
  readonly session_id: string;

  @ApiProperty({
    title: 'Processed Data',
  })
  readonly processed_data: Record<string, unknown>;

  @ApiProperty({
    enum: DOCUMENT_STATUSES,
    example: DOCUMENT_STATUSES[0],
    description: 'Status of the Document.',
    required: false,
  })
  status: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  created_on: Date;

  @ApiProperty({ required: false })
  created_by?: string;

  @ApiProperty({
    required: false,
    description: 'timestamp without time zone',
  })
  updated_on: Date;

  @ApiProperty({ required: false })
  updated_by: string;
}

export class Evaluation {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({
    enum: Object.values(EVALUATION_STATUSES),
    example: Object.values(EVALUATION_STATUSES)?.[0],
    description: 'Status of the Evaluation.',
    required: false,
  })
  status: string;

  @ApiProperty({
    required: false,
  })
  message?: string;
}


