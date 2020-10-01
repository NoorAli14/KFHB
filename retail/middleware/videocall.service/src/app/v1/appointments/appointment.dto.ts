import { IsEnum, IsUUID } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';
import { GENDER, APPOINTMENT_STATUS } from '@common/constants';

@InputType()
export class NewAppointmentInput {
  @Field()
  call_time: Date;

  @Field(() => GENDER, { nullable: true })
  @IsEnum(GENDER)
  gender: string;

  @Field(() => APPOINTMENT_STATUS, { nullable: true })
  status: string;

  @Field()
  @IsUUID('all', { message: 'user_id is not a valid UUID', always: true })
  user_id: string;
}
