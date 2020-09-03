import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsDate, IsEnum } from 'class-validator';

import { Field, InputType } from '@nestjs/graphql';
import { GENDER, APPOINTMENT_STATUS } from '@common/constants';

export class CreateAppointmentDto {
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @ApiProperty()
  @IsDate()
  call_time: Date;

  @ApiProperty()
  @IsEnum(GENDER)
  gender: GENDER;

  @ApiProperty()
  @IsEnum(APPOINTMENT_STATUS)
  status: APPOINTMENT_STATUS;

  @IsUUID()
  user_id: string;
}

@InputType()
export class NewAppointmentInput {
  @Field()
  call_time: Date;

  @Field(() => GENDER)
  @IsEnum(GENDER)
  gender: GENDER;

  @Field(() => APPOINTMENT_STATUS)
  @IsEnum(APPOINTMENT_STATUS)
  status: APPOINTMENT_STATUS;

  @Field()
  @IsUUID('all', { message: 'user_id is not a valid UUID', always: true })
  user_id: string;
}
