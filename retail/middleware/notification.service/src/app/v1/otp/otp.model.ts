import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Otp {
  @Field()
  id: string;

  @Field()
  user_id: string;

  @Field()
  delivery_mode: string;

  @Field()
  otp_code: string;

  @Field()
  status: string;

  @Field()
  created_on: Date;

  @Field()
  created_by: string;

  @Field()
  updated_on?: Date;

  @Field()
  updated_by?: Date;

  @Field()
  deleted_on?: Date;

  @Field()
  deleted_by?: Date;
}

@ObjectType()
export class OTPResponse {
  
  @Field()
  status: number;

  @Field()
  code: string;
}