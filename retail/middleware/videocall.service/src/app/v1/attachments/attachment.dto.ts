import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';

@InputType()
export class NewAttachmentInput {
  @Field()
  @IsUUID('all', { message: 'user_id is not a valid UUID', always: true })
  user_id: string;

  @Field(() => GraphQLUpload)
  @IsNotEmpty()
  @IsString()
  file: string;
}
