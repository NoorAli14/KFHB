import {
  IsBase64,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewAttachmentInput {
  @Field()
  @IsUUID('all', { message: 'customer_id is not a valid UUID', always: true })
  customer_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  attachment_type: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  file_content: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  type?: string;
}
