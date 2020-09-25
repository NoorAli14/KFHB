import { IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('UploadFaceInput')
export class NewFaceInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  file: string;
}
