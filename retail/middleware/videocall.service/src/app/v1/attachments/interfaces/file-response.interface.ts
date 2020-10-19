import { InputType } from '@nestjs/graphql';
import { IsBase64, IsString } from 'class-validator';

@InputType()
export class FileResponse {
  @IsString()
  type: string;

  data: Buffer;

  @IsString()
  file_name: string;

  @IsString()
  file_path: string;

  @IsString()
  file_size: Number;
}
