import { IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewAppointmentInput {
  @Field()
  call_time: Date;

  @Field({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  status: string;

  @Field()
  @IsUUID('all', { message: 'user_id is not a valid UUID', always: true })
  user_id: string;
}
