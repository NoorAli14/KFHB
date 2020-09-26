import { Field, ObjectType } from '@nestjs/graphql';
import { GENDER, APPOINTMENT_STATUS, PLATFORMS } from '@common/constants';
import { IsDate, IsEnum } from 'class-validator';

@ObjectType()
export class User {
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

@ObjectType()
export class Appointment {
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

  @Field(() => User) // Will get this field from another service using ResolveField function.
  user?: User;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
