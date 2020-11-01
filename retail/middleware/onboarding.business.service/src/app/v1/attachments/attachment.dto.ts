import { IsNotEmpty, IsBase64, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ATTACHMENT_TYPES } from '@common/constants';

export class CreateAttachmentDTO {
  @ApiProperty({
    title: 'Base64 file content',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsBase64()
  readonly file_content: string;

  @ApiProperty({
    enum: Object.values(ATTACHMENT_TYPES),
    example: Object.values(ATTACHMENT_TYPES)[0],
    description: 'Attachment Type',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(ATTACHMENT_TYPES))
  readonly attachment_type: string;
}
