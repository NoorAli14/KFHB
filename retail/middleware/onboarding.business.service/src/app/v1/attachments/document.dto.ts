import { IsNotEmpty, IsBase64, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SELFIE_SUB_TYPES } from '@common/constants';

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

  @ApiProperty({
    title: 'Selfie uploading step',
    required: true,
  })
  @IsString()
  @IsIn(Object.values(SELFIE_SUB_TYPES))
  readonly sub_type: string;
}
