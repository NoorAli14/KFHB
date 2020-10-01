import { Field, ObjectType } from '@nestjs/graphql';
import { PLATFORMS } from '@common/constants';

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

  @Field({ nullable: true })
  call_time: Date;

  @Field({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  status: string;

  user_id?: string;

  @Field(() => User) // Will get this field from another service using ResolveField function.
  user?: User;

  @Field()
  created_on: Date;

  @Field()
  updated_on: Date;
}
