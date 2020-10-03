import { IsNotEmpty, IsBase64, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadDocumentDTO {
  @ApiProperty({
    title: 'Base64 file content',
    required: true,
  })
  @IsBase64()
  @IsNotEmpty()
  readonly file: string;
}

export class UploadSelfieDTO {
  @ApiProperty({
    title: 'Base64 file content',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly file: string;
}
