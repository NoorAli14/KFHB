import { InputType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

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
