import { InputType } from '@nestjs/graphql';
import { IsArray, IsBase64, IsString } from 'class-validator';

@InputType()
export class EmailRequest {
  @IsArray()
  bcc: string[];

  @IsString()
  template: string;

  @IsString()
  subject: string;

  @IsString()
  body: string;

  @IsArray()
  context: Object[];
}
