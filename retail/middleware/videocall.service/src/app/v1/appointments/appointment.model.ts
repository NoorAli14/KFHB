import { Field, ObjectType } from '@nestjs/graphql';
import { APPOINTMENT_STATUS, GENDER, PLATFORMS } from '@common/constants';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

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
  fcm_token_id?: string;

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
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  call_time: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsEnum(Object.keys(GENDER))
  @MaxLength(25)
  gender?: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(25)
  @IsOptional()
  @IsEnum(Object.keys(Object.keys(APPOINTMENT_STATUS)))
  status: string;

  user_id: string;

  @Field(() => UserGQL) // Will get this field from another service using ResolveField function.
  user?: UserGQL;

  @Field()
  @IsNotEmpty()
  created_on: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  created_by: string;

  @Field()
  @IsNotEmpty()
  updated_on: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  updated_by: string;
}
