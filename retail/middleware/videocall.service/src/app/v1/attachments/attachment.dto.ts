import { IsBase64, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class NewAttachmentInput {
  @Field()
  @IsUUID('all', { message: 'customer_id is not a valid UUID', always: true })
  customer_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  attachment_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsBase64()
  file_content: string;
}
