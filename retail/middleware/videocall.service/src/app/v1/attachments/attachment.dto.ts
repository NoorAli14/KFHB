import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

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
  screenshot_id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  file_source: string;
}
