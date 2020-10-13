import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewAttachmentInput {
  @Field()
  @IsUUID('all', { message: 'user_id is not a valid UUID', always: true })
  user_id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  file: string;
}
