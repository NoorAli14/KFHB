import { MaxLength, IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('UploadDocumentInput')
export class NewDocumentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  type: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  file: string;
}

@InputType('ProcessDocumentInput')
export class ProcessDocumentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  type: string;
}
