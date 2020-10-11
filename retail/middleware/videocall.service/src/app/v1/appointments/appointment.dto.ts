import {
  IsEnum,
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';
import { APPOINTMENT_STATUS, GENDER } from '@common/constants';

@InputType()
export class NewAppointmentInput {
  @Field()
  @IsNotEmpty()
  call_time: Date;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  @IsEnum(['M', 'F'])
  gender: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  @IsEnum(Object.keys(APPOINTMENT_STATUS))
  status: string;

  @Field()
  @IsUUID('all', { message: 'user_id is not a valid UUID', always: true })
  user_id: string;
}
