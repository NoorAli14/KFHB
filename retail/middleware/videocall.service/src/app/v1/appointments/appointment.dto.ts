import { IsEnum, IsUUID, IsOptional } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';
import { APPOINTMENT_STATUS, GENDER } from '@common/constants';

@InputType()
export class NewAppointmentInput {
  @Field()
  call_time: Date;

  @Field(() => GENDER, { nullable: true })
  @IsEnum(['M', 'F'])
  @IsOptional()
  gender: string;

  @Field(() => APPOINTMENT_STATUS, { nullable: true })
  @IsOptional()
  status: string;

  @Field()
  @IsUUID('all', { message: 'user_id is not a valid UUID', always: true })
  user_id: string;
}
