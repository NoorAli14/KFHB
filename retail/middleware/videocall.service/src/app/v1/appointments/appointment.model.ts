import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';
import { GENDER, APPOINTMENT_STATUS, PLATFORMS } from '@common/constants';
import { IsDate, IsEnum } from 'class-validator';

@ObjectType()
export class UserGQL {
  @Field()
  id?: string;

  @Field()
  first_name?: string;

  @Field()
  middle_name?: string;

  @Field()
  last_name?: string;

  @Field()
  platform?: PLATFORMS;

  @Field()
  device_id?: string;

  @Field()
  firebase_token?: string;

  @Field()
  email?: string;

  @Field()
  gender?: string;

  @Field()
  @IsDate()
  date_of_birth?: Date;

  @Field()
  nationality_id?: string;

  @Field()
  username?: string;

  @Field()
  contact_no?: string;

  @Field()
  created_on?: Date;

  @Field()
  updated_on?: Date;
}

export class Appointment {
  readonly id: string;

  @ApiProperty({
    example: 'Call Time',
    type: Date,
    description: 'Scheduled time of the Call',
  })
  call_time: Date;

  @ApiProperty({
    example: 'male',
    enum: GENDER,
    description: 'Gender of the Agent',
  })
  gender: GENDER;

  @ApiProperty({
    example: 'male',
    enum: APPOINTMENT_STATUS,
    description: 'Gender of the Agent',
  })
  status: APPOINTMENT_STATUS;

  @ApiProperty({
    example: 'e2fad381-d8b0-4531-a9f5-9c908dc9b54a',
    description: 'UUID of the Customer.',
  })
  user_id: string;
}

@ObjectType()
export class AppointmentGQL {
  @Field()
  id: string;

  @Field()
  @IsDate()
  call_time: Date;

  @Field(() => GENDER)
  @IsEnum(GENDER)
  gender: GENDER;

  @Field(() => APPOINTMENT_STATUS)
  @IsEnum(APPOINTMENT_STATUS)
  status: APPOINTMENT_STATUS;

  user_id?: string;

  @Field(() => UserGQL) // Will get this field from another service using ResolveField function.
  user?: UserGQL;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
