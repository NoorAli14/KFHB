import { MaxLength } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendSMSInput {
  @Field()
  @MaxLength(30)
  to: string;

  @Field()
  @MaxLength(500)
  body: string;
}
